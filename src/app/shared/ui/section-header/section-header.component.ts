import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ScrambleTextDirective } from '../../motion/scramble-text.directive';
import { RevealDirective } from '../../motion/reveal.directive';

/**
 * Cabeçalho padrão das seções AXIOM:
 *   01 // LABEL ─────────
 *   Título (scramble ao entrar na viewport)
 *   Lead opcional (blur-to-clear)
 *
 * Os textos chegam já traduzidos (pipe transloco no pai).
 */
@Component({
  selector: 'ax-section-header',
  standalone: true,
  imports: [ScrambleTextDirective, RevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <p class="eyebrow" axReveal>
      <span class="index">{{ index() }}</span>
      <span class="sep" aria-hidden="true">//</span>
      <span class="label">{{ label() }}</span>
      <span class="rule" aria-hidden="true"></span>
    </p>

    <h2 class="title" [id]="titleId()" [attr.aria-label]="title()">
      <span aria-hidden="true" [axScramble]="title()" scrambleTrigger="view">{{ title() }}</span>
    </h2>

    @if (lead()) {
      <p class="lead" axReveal="blur" [revealDelay]="0.2">{{ lead() }}</p>
    }
  `,
  styleUrl: './section-header.component.scss',
})
export class SectionHeaderComponent {
  readonly index = input.required<string>();
  readonly label = input.required<string>();
  readonly title = input.required<string>();
  readonly titleId = input.required<string>();
  readonly lead = input<string>('');
}
