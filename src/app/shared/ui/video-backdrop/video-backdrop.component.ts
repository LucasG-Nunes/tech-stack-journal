import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  afterNextRender,
  computed,
  effect,
  inject,
  input,
  untracked,
  viewChild,
} from '@angular/core';
import { GsapService } from '../../../core/motion/gsap.service';
import { ModalService } from '../../services/ModalService';

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

/** Distância máxima de ligação entre nós (px CSS) e seu quadrado (evita sqrt para pares distantes). */
const LINK_DIST = 150;
const LINK_DIST_SQ = LINK_DIST * LINK_DIST;
/** Faixas de opacidade das linhas: cada faixa vira UM stroke() por cor. */
const ALPHA_BANDS = 4;
const LINE_ALPHA_MAX = 0.22;
/** Velocidade em px por ms (≈ 0.25 px/frame a 60 Hz), independente da taxa de atualização. */
const SPEED = 0.015;
/**
 * Intervalo mínimo entre desenhos. O canvas fica atrás de um overlay de ~80%
 * e os nós andam devagar: 30 fps é visualmente idêntico e corta pela metade o
 * custo de rasterizar e recompor tudo que está por cima dele.
 */
const FRAME_MS = 1000 / 30;

/**
 * Background cinematográfico AXIOM.
 *
 * - Com `sources`: vídeo em loop, mudo, preload="none", poster como fallback.
 *   Só toca quando visível; com reduced-motion ou Save-Data fica no poster.
 * - Sem `sources`: rede neural procedural em <canvas> (placeholder leve até
 *   os vídeos holográficos chegarem).
 * - Overlay escuro + grão por cima, sempre.
 * - Pausa fora da viewport, com a aba oculta e enquanto um modal está aberto.
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
  private readonly modal = inject(ModalService);
  private readonly cleanups: (() => void)[] = [];

  /** Reavalia play/pause; definido quando a mídia é configurada. */
  private sync?: () => void;
  private inView = false;

  constructor() {
    afterNextRender(() =>
      this.motion.outside(() => {
        const video = this.video()?.nativeElement;
        const canvas = this.canvas()?.nativeElement;
        if (video) this.setupVideo(video);
        if (canvas) this.setupCanvas(canvas);
      }),
    );

    // Modal abriu/fechou → pausa/retoma o fundo. Fora da NgZone: o rAF do
    // canvas não pode ser registrado dentro dela (dispararia change detection por frame).
    effect(() => {
      this.modal.isOpen();
      untracked(() => this.motion.outside(() => this.sync?.()));
    });

    inject(DestroyRef).onDestroy(() => this.cleanups.forEach(fn => fn()));
  }

  /** Deve animar agora? Na viewport, aba ativa e sem modal por cima. */
  private get shouldRun(): boolean {
    return this.inView && document.visibilityState === 'visible' && !this.modal.isOpen();
  }

  // ------------------------------------------------------------------ video
  private setupVideo(video: HTMLVideoElement): void {
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
    if (this.motion.prefersReducedMotion() || saveData) return;

    video.muted = true;
    this.observeVisibility(() => {
      if (this.shouldRun) {
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

    // Estilos pré-calculados: nenhuma string de cor é montada dentro do loop.
    const bandStyles = (rgb: string): string[] =>
      Array.from(
        { length: ALPHA_BANDS },
        (_, band) => `rgba(${rgb}, ${(((band + 0.5) / ALPHA_BANDS) * LINE_ALPHA_MAX).toFixed(3)})`,
      );
    const lineStyles = [bandStyles(cyan), bandStyles(purple)];
    const dotStyles = [`rgba(${cyan}, 0.75)`, `rgba(${purple}, 0.75)`];

    let width = 0;
    let height = 0;
    let nodes: NetNode[] = [];
    let raf = 0;
    let running = false;
    let lastTick = 0;

    /**
     * Desenho em lote: as linhas são agrupadas por cor × faixa de opacidade em
     * Path2D e cada grupo recebe um único stroke(). Antes eram centenas de
     * beginPath/stroke por frame; agora são no máximo 2 × ALPHA_BANDS + 2 chamadas.
     */
    const draw = (): void => {
      ctx.clearRect(0, 0, width, height);

      const linePaths = [
        Array.from({ length: ALPHA_BANDS }, () => new Path2D()),
        Array.from({ length: ALPHA_BANDS }, () => new Path2D()),
      ];
      const dotPaths = [new Path2D(), new Path2D()];
      const split = width * 0.55;

      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        const color = a.x < split ? 0 : 1;

        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 >= LINK_DIST_SQ) continue;

          const strength = 1 - Math.sqrt(d2) / LINK_DIST;
          const band = Math.min(ALPHA_BANDS - 1, Math.floor(strength * ALPHA_BANDS));
          const path = linePaths[color][band];
          path.moveTo(a.x, a.y);
          path.lineTo(b.x, b.y);
        }

        const dot = dotPaths[color];
        dot.moveTo(a.x + 1.4, a.y);
        dot.arc(a.x, a.y, 1.4, 0, Math.PI * 2);
      }

      ctx.lineWidth = 1;
      for (let c = 0; c < 2; c++) {
        for (let band = 0; band < ALPHA_BANDS; band++) {
          ctx.strokeStyle = lineStyles[c][band];
          ctx.stroke(linePaths[c][band]);
        }
        ctx.fillStyle = dotStyles[c];
        ctx.fill(dotPaths[c]);
      }
    };

    const resize = (): void => {
      // DPR fixo em 1: o canvas está sob um overlay escuro de ~80%, então a
      // nitidez retina não aparece, mas custaria 2–4x mais pixels por frame.
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.round(width);
      canvas.height = Math.round(height);

      const count = Math.min(90, Math.round((width * height) / 16000));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 2 * SPEED,
        vy: (Math.random() - 0.5) * 2 * SPEED,
      }));
      draw();
    };

    const step = (now: number): void => {
      raf = requestAnimationFrame(step);
      const elapsed = now - lastTick;
      if (elapsed < FRAME_MS) return;

      // Movimento por tempo decorrido: mesma velocidade em 60, 120 ou 144 Hz.
      const dt = Math.min(elapsed, 100);
      lastTick = now;

      for (const n of nodes) {
        n.x += n.vx * dt;
        n.y += n.vy * dt;
        if (n.x < 0 || n.x > width) n.vx *= -1;
        if (n.y < 0 || n.y > height) n.vy *= -1;
      }
      draw();
    };

    const start = (): void => {
      if (running || this.motion.prefersReducedMotion()) return;
      running = true;
      lastTick = performance.now();
      raf = requestAnimationFrame(step);
    };

    const stop = (): void => {
      running = false;
      cancelAnimationFrame(raf);
    };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    this.cleanups.push(() => ro.disconnect(), stop);

    this.observeVisibility(() => (this.shouldRun ? start() : stop()));
  }

  // ---------------------------------------------------------------- helpers
  /** Liga IntersectionObserver + visibilitychange ao callback de play/pause. */
  private observeVisibility(cb: () => void): void {
    this.sync = cb;

    const io = new IntersectionObserver(([entry]) => {
      this.inView = entry.isIntersecting;
      cb();
    });
    io.observe(this.host);

    document.addEventListener('visibilitychange', cb);
    this.cleanups.push(
      () => io.disconnect(),
      () => document.removeEventListener('visibilitychange', cb),
    );
  }
}
