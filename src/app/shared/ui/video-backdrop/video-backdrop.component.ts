import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  afterNextRender,
  computed,
  inject,
  input,
  viewChild,
} from '@angular/core';
import { GsapService } from '../../../core/motion/gsap.service';

export interface VideoSource {
  src: string;
  type: 'video/webm' | 'video/mp4';
}

interface NetNode {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

/**
 * Background cinematográfico AXIOM.
 *
 * - Com `sources`: vídeo em loop, mudo, preload="none", poster como fallback.
 *   Só toca quando visível; com reduced-motion ou Save-Data fica no poster.
 * - Sem `sources`: rede neural procedural em <canvas> (placeholder leve até
 *   os vídeos holográficos chegarem).
 * - Overlay escuro + grão + vinheta por cima, sempre.
 */
@Component({
  selector: 'ax-video-backdrop',
  standalone: true,
  templateUrl: './video-backdrop.component.html',
  styleUrl: './video-backdrop.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'aria-hidden': 'true',
    '[style.--ax-overlay]': 'overlay()',
  },
})
export class VideoBackdropComponent {
  readonly sources = input<VideoSource[]>([]);
  readonly poster = input<string | undefined>(undefined);
  /** Opacidade do overlay escuro (0–1). */
  readonly overlay = input<number>(0.78);

  protected readonly useVideo = computed(() => this.sources().length > 0);

  private readonly video = viewChild<ElementRef<HTMLVideoElement>>('video');
  private readonly canvas = viewChild<ElementRef<HTMLCanvasElement>>('canvas');
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private readonly motion = inject(GsapService);
  private readonly cleanups: (() => void)[] = [];

  constructor() {
    afterNextRender(() =>
      this.motion.outside(() => {
        const video = this.video()?.nativeElement;
        const canvas = this.canvas()?.nativeElement;
        if (video) this.setupVideo(video);
        if (canvas) this.setupCanvas(canvas);
      }),
    );

    inject(DestroyRef).onDestroy(() => this.cleanups.forEach(fn => fn()));
  }

  // ------------------------------------------------------------------ video
  private setupVideo(video: HTMLVideoElement): void {
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
    if (this.motion.prefersReducedMotion() || saveData) return;

    video.muted = true;
    this.observeVisibility(visible => {
      if (visible) {
        video.play().catch(() => undefined);
      } else {
        video.pause();
      }
    });
  }

  // ----------------------------------------------------------------- canvas
  private setupCanvas(canvas: HTMLCanvasElement): void {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const css = getComputedStyle(this.host);
    const cyan = css.getPropertyValue('--ax-cyan-rgb').trim() || '0, 240, 255';
    const purple = css.getPropertyValue('--ax-purple-rgb').trim() || '168, 85, 247';

    let width = 0;
    let height = 0;
    let nodes: NetNode[] = [];
    let raf = 0;
    let running = false;
    const linkDist = 150;

    const resize = (): void => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.min(90, Math.round((width * height) / 16000));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
      }));
      if (!running) draw();
    };

    const draw = (): void => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        const rgb = a.x / width < 0.55 ? cyan : purple;

        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist < linkDist) {
            ctx.strokeStyle = `rgba(${rgb}, ${(1 - dist / linkDist) * 0.22})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }

        ctx.fillStyle = `rgba(${rgb}, 0.75)`;
        ctx.beginPath();
        ctx.arc(a.x, a.y, 1.4, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const step = (): void => {
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > width) n.vx *= -1;
        if (n.y < 0 || n.y > height) n.vy *= -1;
      }
      draw();
      raf = requestAnimationFrame(step);
    };

    const start = (): void => {
      if (running || this.motion.prefersReducedMotion()) return;
      running = true;
      raf = requestAnimationFrame(step);
    };

    const stop = (): void => {
      running = false;
      cancelAnimationFrame(raf);
    };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    this.cleanups.push(() => ro.disconnect(), stop);

    this.observeVisibility(visible => (visible ? start() : stop()));
  }

  // ---------------------------------------------------------------- helpers
  /** Visível = na viewport E aba ativa. */
  private observeVisibility(cb: (visible: boolean) => void): void {
    let inView = false;
    const emit = (): void => cb(inView && document.visibilityState === 'visible');

    const io = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      emit();
    });
    io.observe(this.host);

    document.addEventListener('visibilitychange', emit);
    this.cleanups.push(
      () => io.disconnect(),
      () => document.removeEventListener('visibilitychange', emit),
    );
  }
}
