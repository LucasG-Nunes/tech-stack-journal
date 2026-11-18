import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  afterNextRender,
  inject,
  input,
} from '@angular/core';
import { GsapService } from '../../../core/motion/gsap.service';

export type GlassAccent = 'cyan' | 'purple';

/**
 * Card glassmorphism AXIOM.
 *
 * - Fundo translúcido + backdrop-blur, borda 1px com gradiente via máscara.
 * - Spotlight que segue o cursor (CSS vars --mx/--my). O listener roda fora da
 *   NgZone e só escreve style no host → zero change detection por movimento.
 * - Conteúdo via <ng-content>; o card não impõe tipografia.
 *
 * O tilt 3D entra depois como diretiva separada ([axTilt]) para poder ser
 * aplicado aqui ou em qualquer outro elemento.
 */
@Component({
  selector: 'ax-glass-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<ng-content />`,
  styleUrl: './glass-card.component.scss',
  host: {
    '[attr.data-accent]': 'accent()',
  },
})
export class GlassCardComponent {
  readonly accent = input<GlassAccent>('cyan');

  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private readonly motion = inject(GsapService);

  constructor() {
    const onMove = (event: PointerEvent): void => {
      const rect = this.host.getBoundingClientRect();
      this.host.style.setProperty('--mx', `${event.clientX - rect.left}px`);
      this.host.style.setProperty('--my', `${event.clientY - rect.top}px`);
    };

    afterNextRender(() => {
      if (!this.motion.hasFinePointer()) return;
      this.motion.outside(() => this.host.addEventListener('pointermove', onMove, { passive: true }));
    });

    inject(DestroyRef).onDestroy(() => this.host.removeEventListener('pointermove', onMove));
  }
}
