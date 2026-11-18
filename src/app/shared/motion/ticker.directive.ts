import { DestroyRef, Directive, ElementRef, afterNextRender, inject, input } from '@angular/core';
import { GsapService, ScrollTriggerInstance } from '../../core/motion/gsap.service';
import { AX_DURATION, AX_EASE } from '../../core/motion/motion.tokens';

/**
 * Contador animado (ticker) para números de impacto.
 *
 * Uso:
 *   <span [axTicker]="460" tickerPrefix="+" tickerSuffix="K">+460K</span>
 *
 * - O template já traz o valor final → SSR/SEO e reduced-motion corretos.
 * - No browser, conta de 0 até o valor quando o elemento entra na viewport (uma vez).
 * - Largura travada via tabular-nums (aplique `font-variant-numeric: tabular-nums` no CSS).
 */
@Directive({
  selector: '[axTicker]',
  standalone: true,
})
export class TickerDirective {
  readonly value = input.required<number>({ alias: 'axTicker' });
  readonly tickerPrefix = input<string>('');
  readonly tickerSuffix = input<string>('');
  readonly tickerDecimals = input<number>(0);
  readonly tickerDelay = input<number>(0);
  readonly tickerDuration = input<number>(AX_DURATION.ticker);

  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private readonly motion = inject(GsapService);

  private tween?: gsap.core.Tween;
  private trigger?: ScrollTriggerInstance;

  constructor() {
    afterNextRender(() => {
      if (this.motion.prefersReducedMotion()) return;

      this.motion
        .load()
        .then(({ gsap, ScrollTrigger }) =>
          this.motion.outside(() => {
            const counter = { n: 0 };
            this.render(0);

            this.trigger = ScrollTrigger.create({
              trigger: this.host,
              start: 'top 95%',
              once: true,
              onEnter: () => {
                this.tween = gsap.to(counter, {
                  n: this.value(),
                  delay: this.tickerDelay(),
                  duration: this.tickerDuration(),
                  ease: AX_EASE.out,
                  onUpdate: () => this.render(counter.n),
                });
              },
            });
          }),
        )
        .catch(() => undefined);
    });

    inject(DestroyRef).onDestroy(() => {
      this.tween?.kill();
      this.trigger?.kill();
    });
  }

  private render(n: number): void {
    const decimals = this.tickerDecimals();
    const formatted = n.toFixed(decimals);
    this.host.textContent = `${this.tickerPrefix()}${formatted}${this.tickerSuffix()}`;
  }
}
