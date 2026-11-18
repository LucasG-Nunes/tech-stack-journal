import { DestroyRef, Directive, ElementRef, afterNextRender, inject, input } from '@angular/core';
import { GsapService } from '../../core/motion/gsap.service';

/**
 * Efeito terminal: “digita” as linhas de um bloco quando ele entra na viewport.
 *
 * Uso:
 *   <div axTypewriter>
 *     <p data-type-line="cmd">$ whoami</p>        → digitada caractere a caractere
 *     <p data-type-line>lucas@axiom</p>           → aparece de uma vez (saída)
 *   </div>
 *
 * - Revela por clip-path em degraus (steps), sem tocar no textContent:
 *   os bindings do Angular continuam vivos (troca de idioma funciona).
 * - O HTML do SSR já traz todas as linhas visíveis → SEO e no-JS ok.
 * - prefers-reduced-motion: não anima.
 */
@Directive({
  selector: '[axTypewriter]',
  standalone: true,
})
export class TypewriterDirective {
  /** Segundos por caractere nas linhas de comando. */
  readonly typeSpeed = input<number>(0.035);
  /** Pausa após cada linha. */
  readonly typePause = input<number>(0.18);
  readonly typeStart = input<string>('top 75%');

  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private readonly motion = inject(GsapService);

  constructor() {
    let revert: (() => void) | undefined;

    afterNextRender(() => {
      if (this.motion.prefersReducedMotion()) return;

      this.motion
        .load()
        .then(({ gsap }) =>
          this.motion.outside(() => {
            const ctx = gsap.context(() => {
              const lines = Array.from(this.host.querySelectorAll<HTMLElement>('[data-type-line]'));
              const tl = gsap.timeline({
                paused: true,
                scrollTrigger: { trigger: this.host, start: this.typeStart(), once: true },
              });

              gsap.set(lines, { clipPath: 'inset(0 100% 0 0)' });

              for (const line of lines) {
                const isCmd = line.dataset['typeLine'] === 'cmd';
                const chars = Math.max(1, (line.textContent ?? '').trim().length);

                tl.to(line, {
                  clipPath: 'inset(0 0% 0 0)',
                  duration: isCmd ? chars * this.typeSpeed() : 0.01,
                  ease: isCmd ? `steps(${chars})` : 'none',
                }).to({}, { duration: isCmd ? this.typePause() * 2 : this.typePause() });
              }

              tl.set(lines, { clearProps: 'clipPath' });
            }, this.host);

            revert = () => ctx.revert();
          }),
        )
        .catch(() => undefined);
    });

    inject(DestroyRef).onDestroy(() => revert?.());
  }
}
