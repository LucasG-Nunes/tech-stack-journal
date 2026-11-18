import { DestroyRef, Directive, ElementRef, afterNextRender, inject, input } from '@angular/core';
import { GsapService } from '../../core/motion/gsap.service';
import { AX_DURATION, AX_EASE } from '../../core/motion/motion.tokens';

export type RevealVariant = 'fade-up' | 'blur';

/**
 * Reveal por scroll (ScrollTrigger), substituto AXIOM do appScrollReveal.
 *
 * Uso:
 *   <div axReveal>…</div>                          → fade-up no próprio host
 *   <div axReveal="blur">…</div>                   → blur-to-clear
 *   <ul axReveal [revealStagger]="0.12">
 *     <li data-reveal-item>…</li>                  → anima os filhos em cascata
 *   </ul>
 *
 * - O host recebe data-ax-intro via host binding (também no SSR), então fica
 *   oculto até o GSAP assumir; failsafe global de 2.5s se o JS falhar.
 * - Anima uma vez (once) — conteúdo não “some” de novo ao rolar para cima.
 * - prefers-reduced-motion: apenas revela, sem movimento.
 */
@Directive({
  selector: '[axReveal]',
  standalone: true,
  host: { 'data-ax-intro': '' },
})
export class RevealDirective {
  /** Variante; atributo vazio (`axReveal`) = 'fade-up'. */
  readonly variant = input<RevealVariant | ''>('', { alias: 'axReveal' });
  /** > 0 anima os filhos [data-reveal-item] em cascata em vez do host. */
  readonly revealStagger = input<number>(0);
  readonly revealDelay = input<number>(0);
  /** Posição do ScrollTrigger. */
  readonly revealStart = input<string>('top 82%');

  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private readonly motion = inject(GsapService);

  constructor() {
    let revert: (() => void) | undefined;
    const ready = (): void => this.host.setAttribute('data-ax-ready', '');

    afterNextRender(() => {
      if (this.motion.prefersReducedMotion()) {
        ready();
        return;
      }

      this.motion
        .load()
        .then(({ gsap }) =>
          this.motion.outside(() => {
            const ctx = gsap.context(() => {
              const stagger = this.revealStagger();
              const targets = stagger > 0 ? this.host.querySelectorAll('[data-reveal-item]') : this.host;
              const isBlur = this.variant() === 'blur';

              ready();

              gsap.fromTo(
                targets,
                {
                  autoAlpha: 0,
                  y: isBlur ? 0 : 40,
                  scale: isBlur ? 0.985 : 1,
                  filter: `blur(${isBlur ? 16 : 6}px)`,
                },
                {
                  autoAlpha: 1,
                  y: 0,
                  scale: 1,
                  filter: 'blur(0px)',
                  duration: isBlur ? AX_DURATION.slow : AX_DURATION.base,
                  delay: this.revealDelay(),
                  ease: AX_EASE.out,
                  stagger,
                  clearProps: 'filter,transform',
                  scrollTrigger: { trigger: this.host, start: this.revealStart(), once: true },
                },
              );
            }, this.host);

            revert = () => ctx.revert();
          }),
        )
        .catch(ready);
    });

    inject(DestroyRef).onDestroy(() => revert?.());
  }
}
