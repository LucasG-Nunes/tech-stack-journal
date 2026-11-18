import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  afterNextRender,
  inject,
  input,
  viewChild,
} from '@angular/core';
import { GsapService } from '../../../core/motion/gsap.service';

export type GlassAccent = 'cyan' | 'purple';

/**
 * Card glassmorphism AXIOM.
 *
 * - Fundo translúcido, borda 1px em gradiente via máscara.
 * - Sem backdrop-filter por padrão: os cards ficam sobre o #050505 liso, onde
 *   o blur não muda nada visualmente, mas cada um custava uma camada extra de
 *   GPU refeita a cada frame de scroll. Para um card sobre mídia em movimento,
 *   use `frosted` (blur leve aplicado num pseudo-elemento isolado).
 * - Spotlight que segue o cursor: um elemento próprio movido só com
 *   `transform` (composição pura, sem repintar o gradiente). Os eventos são
 *   agrupados em um write por frame (rAF) e o retângulo do card fica em cache.
 * - Listener fora da NgZone: nenhum change detection por movimento.
 */
@Component({
  selector: 'ax-glass-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<span #spot class="spot" aria-hidden="true"></span><ng-content />`,
  styleUrl: './glass-card.component.scss',
  host: {
    '[attr.data-accent]': 'accent()',
    '[attr.data-frosted]': 'frosted() ? "" : null',
  },
})
export class GlassCardComponent {
  readonly accent = input<GlassAccent>('cyan');
  /** Ativa o blur de fundo. Use só quando houver conteúdo em movimento atrás do card. */
  readonly frosted = input<boolean>(false);

  private readonly spot = viewChild.required<ElementRef<HTMLElement>>('spot');
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private readonly motion = inject(GsapService);

  constructor() {
    let cleanup: (() => void) | undefined;

    afterNextRender(() => {
      if (!this.motion.hasFinePointer()) return;

      const host = this.host;
      const spot = this.spot().nativeElement;
      let rect: DOMRect | null = null;
      let rectScrollY = 0;
      let x = 0;
      let y = 0;
      let frame = 0;

      const write = (): void => {
        frame = 0;
        spot.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      };

      const onEnter = (): void => {
        rect = host.getBoundingClientRect();
        rectScrollY = window.scrollY;
      };

      const onMove = (event: PointerEvent): void => {
        // Rolou com o mouse parado sobre o card? Só então mede de novo.
        if (!rect || window.scrollY !== rectScrollY) onEnter();
        x = event.clientX - rect!.left;
        y = event.clientY - rect!.top;
        frame ||= requestAnimationFrame(write);
      };

      const onLeave = (): void => {
        rect = null;
      };

      this.motion.outside(() => {
        host.addEventListener('pointerenter', onEnter, { passive: true });
        host.addEventListener('pointermove', onMove, { passive: true });
        host.addEventListener('pointerleave', onLeave, { passive: true });
      });

      cleanup = () => {
        cancelAnimationFrame(frame);
        host.removeEventListener('pointerenter', onEnter);
        host.removeEventListener('pointermove', onMove);
        host.removeEventListener('pointerleave', onLeave);
      };
    });

    inject(DestroyRef).onDestroy(() => cleanup?.());
  }
}
