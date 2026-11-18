import {
  DestroyRef,
  Directive,
  ElementRef,
  afterNextRender,
  effect,
  inject,
  input,
  untracked,
} from '@angular/core';
import { GsapService, MotionKit, ScrollTriggerInstance } from '../../core/motion/gsap.service';
import { AX_DURATION, AX_EASE, AX_SCRAMBLE_CHARS } from '../../core/motion/motion.tokens';

type ScrambleTrigger = 'load' | 'view';

/**
 * Efeito "decodificação" (ScrambleTextPlugin) para títulos.
 *
 * Uso:
 *   <span [axScramble]="'HERO.LINE_1' | transloco" data-ax-intro>{{ 'HERO.LINE_1' | transloco }}</span>
 *
 * - O texto real vem do template → SSR/SEO intactos.
 * - trigger 'load': decodifica a partir do vazio (use com data-ax-intro para evitar flash).
 * - trigger 'view': decodifica in-place quando entra na viewport (ScrollTrigger, uma vez).
 * - Reage à troca de idioma re-decodificando para o novo texto.
 * - prefers-reduced-motion: não anima.
 * - Altura travada durante a animação para não gerar layout shift.
 */
@Directive({
  selector: '[axScramble]',
  standalone: true,
})
export class ScrambleTextDirective {
  readonly text = input.required<string>({ alias: 'axScramble' });
  readonly scrambleTrigger = input<ScrambleTrigger>('view');
  readonly scrambleDelay = input<number>(0);
  readonly scrambleDuration = input<number>(AX_DURATION.scramble);

  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private readonly motion = inject(GsapService);

  private kit?: MotionKit;
  private tween?: gsap.core.Tween;
  private trigger?: ScrollTriggerInstance;
  /** true quando o GSAP já assumiu o textContent do host. */
  private owned = false;
  private lastText?: string;

  constructor() {
    // Troca de idioma → re-decodifica (só depois que o GSAP assumiu o nó).
    effect(() => {
      const next = this.text();
      untracked(() => {
        if (this.owned && next !== this.lastText) {
          this.play(next, 0, AX_DURATION.scramble * 0.6, false);
        }
        this.lastText = next;
      });
    });

    afterNextRender(() => {
      if (this.motion.prefersReducedMotion()) {
        this.host.setAttribute('data-ax-ready', '');
        return;
      }
      this.motion
        .load()
        .then(kit => {
          this.kit = kit;
          this.arm();
        })
        .catch(() => this.host.setAttribute('data-ax-ready', ''));
    });

    inject(DestroyRef).onDestroy(() => {
      this.tween?.kill();
      this.trigger?.kill();
    });
  }

  private arm(): void {
    if (this.scrambleTrigger() === 'load') {
      this.play(this.text(), this.scrambleDelay(), this.scrambleDuration(), true);
      return;
    }

    this.motion.outside(() => {
      this.trigger = this.kit!.ScrollTrigger.create({
        trigger: this.host,
        start: 'top 85%',
        once: true,
        onEnter: () => this.play(this.text(), this.scrambleDelay(), this.scrambleDuration(), false),
      });
    });
  }

  private play(text: string, delay: number, duration: number, fromEmpty: boolean): void {
    if (!this.kit) return;
    const { gsap } = this.kit;
    const host = this.host;

    this.motion.outside(() => {
      this.tween?.kill();
      host.style.height = `${host.offsetHeight}px`;

      if (fromEmpty) {
        host.textContent = '';
      }
      host.setAttribute('data-ax-ready', '');
      this.owned = true;

      this.tween = gsap.to(host, {
        delay,
        duration,
        ease: AX_EASE.soft,
        scrambleText: {
          text,
          chars: AX_SCRAMBLE_CHARS,
          revealDelay: duration * 0.25,
          speed: 0.6,
          tweenLength: fromEmpty,
        },
        onComplete: () => {
          host.style.height = '';
        },
      });
    });
  }
}
