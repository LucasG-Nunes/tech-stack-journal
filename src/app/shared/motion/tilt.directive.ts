import { DestroyRef, Directive, ElementRef, afterNextRender, inject, input } from '@angular/core';
import { GsapService } from '../../core/motion/gsap.service';
import { AX_EASE } from '../../core/motion/motion.tokens';

/**
 * Tilt 3D sutil seguindo o cursor.
 *
 * Uso:
 *   <ax-glass-card axTilt>…</ax-glass-card>
 *   <div axTilt [tiltMax]="4" [tiltScale]="1.01">…</div>
 *
 * - Só ativa com mouse de precisão (hover + pointer fine) e sem reduced-motion.
 * - gsap.quickTo → um único tween reaproveitado por eixo, 60fps sem GC.
 * - Listeners fora da NgZone: nenhum ciclo de change detection por movimento.
 */
@Directive({
  selector: '[axTilt]',
  standalone: true,
})
export class TiltDirective {
  /** Inclinação máxima em graus. */
  readonly tiltMax = input<number>(6);
  /** Escala durante o hover. */
  readonly tiltScale = input<number>(1.015);
  readonly tiltPerspective = input<number>(1000);

  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private readonly motion = inject(GsapService);

  constructor() {
    let cleanup: (() => void) | undefined;

    afterNextRender(() => {
      if (!this.motion.hasFinePointer() || this.motion.prefersReducedMotion()) return;

      this.motion
        .load()
        .then(({ gsap }) =>
          this.motion.outside(() => {
            const el = this.host;
            const max = this.tiltMax();

            gsap.set(el, { transformPerspective: this.tiltPerspective(), transformStyle: 'preserve-3d' });

            const toRotX = gsap.quickTo(el, 'rotationX', { duration: 0.6, ease: AX_EASE.soft });
            const toRotY = gsap.quickTo(el, 'rotationY', { duration: 0.6, ease: AX_EASE.soft });
            const toScale = gsap.quickTo(el, 'scale', { duration: 0.6, ease: AX_EASE.soft });

            const onMove = (event: PointerEvent): void => {
              const rect = el.getBoundingClientRect();
              const px = (event.clientX - rect.left) / rect.width - 0.5;
              const py = (event.clientY - rect.top) / rect.height - 0.5;
              toRotY(px * max * 2);
              toRotX(-py * max * 2);
            };
            const onEnter = (): void => {
              toScale(this.tiltScale());
            };
            const onLeave = (): void => {
              toRotX(0);
              toRotY(0);
              toScale(1);
            };

            el.addEventListener('pointermove', onMove, { passive: true });
            el.addEventListener('pointerenter', onEnter, { passive: true });
            el.addEventListener('pointerleave', onLeave, { passive: true });

            cleanup = () => {
              el.removeEventListener('pointermove', onMove);
              el.removeEventListener('pointerenter', onEnter);
              el.removeEventListener('pointerleave', onLeave);
              gsap.killTweensOf(el);
            };
          }),
        )
        .catch(() => undefined);
    });

    inject(DestroyRef).onDestroy(() => cleanup?.());
  }
}
