import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  afterNextRender,
  inject,
} from '@angular/core';
import { TranslocoModule } from '@jsverse/transloco';
import { GsapService } from '../../../../core/motion/gsap.service';
import { AX_DURATION, AX_EASE, AX_STAGGER } from '../../../../core/motion/motion.tokens';
import { ScrambleTextDirective } from '../../../../shared/motion/scramble-text.directive';
import { TickerDirective } from '../../../../shared/motion/ticker.directive';
import { VideoBackdropComponent, VideoSource } from '../../../../shared/ui/video-backdrop/video-backdrop.component';

interface HeroMetric {
  value: number;
  suffix: string;
  label: string;
}

/**
 * HERO — AXIOM
 *
 * Orquestração da entrada:
 *   tag → H1 (scramble, via [axScramble]) → sub (blur-to-clear) → CTAs → status bar (+ tickers)
 * Ao rolar: o conteúdo sobe e desfoca levemente (parallax com ScrollTrigger scrub).
 */
@Component({
  selector: 'tech-stack-hero-section',
  imports: [TranslocoModule, ScrambleTextDirective, TickerDirective, VideoBackdropComponent],
  templateUrl: './tech-stack-hero-section.component.html',
  styleUrl: './tech-stack-hero-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TechStackHeroSection {
  /** Vídeos holográficos: quando os assets existirem, preencha e o canvas sai de cena. */
  protected readonly videoSources: VideoSource[] = [];

  /** Números reais, extraídos dos cases já publicados no site. */
  protected readonly metrics: HeroMetric[] = [
    { value: 460, suffix: 'K+', label: 'HERO.METRICS.LOC' },
    { value: 5, suffix: 'K+', label: 'HERO.METRICS.MRS' },
    { value: 45, suffix: '%', label: 'HERO.METRICS.INTL' },
  ];


  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private readonly motion = inject(GsapService);

  constructor() {
    let revert: (() => void) | undefined;

    afterNextRender(() => {
      const els = Array.from(this.host.querySelectorAll<HTMLElement>('[data-hero]'));

      if (this.motion.prefersReducedMotion()) {
        els.forEach(el => el.setAttribute('data-ax-ready', ''));
        return;
      }

      this.motion
        .load()
        .then(({ gsap }) =>
          this.motion.outside(() => {
            const ctx = gsap.context(() => {
              els.forEach(el => el.setAttribute('data-ax-ready', ''));

              gsap
                .timeline({ defaults: { ease: AX_EASE.out, duration: AX_DURATION.base } })
                .from('[data-hero="tag"]', { autoAlpha: 0, x: -16 }, 0)
                .from(
                  '[data-hero="fade"]',
                  { autoAlpha: 0, y: 28, filter: 'blur(12px)', stagger: AX_STAGGER.base },
                  0.9,
                )
                .from('[data-hero="status"]', { autoAlpha: 0, y: 16, duration: AX_DURATION.slow }, 1.3);

              // Parallax de saída: conteúdo sobe e perde nitidez enquanto o usuário rola.
              gsap.to('.hero__inner', {
                yPercent: -12,
                autoAlpha: 0.15,
                filter: 'blur(6px)',
                ease: 'none',
                scrollTrigger: {
                  trigger: this.host,
                  start: 'top top',
                  end: 'bottom top',
                  scrub: true,
                },
              });
            }, this.host);

            revert = () => ctx.revert();
          }),
        )
        .catch(() => els.forEach(el => el.setAttribute('data-ax-ready', '')));
    });

    inject(DestroyRef).onDestroy(() => revert?.());
  }
}
