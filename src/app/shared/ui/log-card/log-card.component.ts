import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { TranslocoModule } from '@jsverse/transloco';
import { EngineeringLog } from '../../contants/engineering-logs.constant';
import { TiltDirective } from '../../motion/tilt.directive';
import { GlassCardComponent } from '../glass-card/glass-card.component';

/**
 * Card de log de engenharia (Home 06 e /blog).
 * Rascunho mostra "Em redação" no lugar da data; tempo de leitura só quando publicado.
 */
@Component({
  selector: 'ax-log-card',
  standalone: true,
  imports: [TranslocoModule, GlassCardComponent, TiltDirective],
  templateUrl: './log-card.component.html',
  styleUrl: './log-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.is-featured]': 'featured()',
  },
})
export class LogCardComponent {
  readonly log = input.required<EngineeringLog>();
  readonly featured = input(false);
  readonly opened = output<EngineeringLog>();

  /** 2026-11-18 → 2026.11.18 (neutro de idioma, estética de log). */
  protected stamp(date: string): string {
    return date.replaceAll('-', '.');
  }
}
