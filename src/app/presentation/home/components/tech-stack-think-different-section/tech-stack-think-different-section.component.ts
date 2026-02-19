import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslocoModule } from '@jsverse/transloco';

@Component({
  selector: 'tech-stack-think-different-section',
  imports: [TranslocoModule],
  templateUrl: './tech-stack-think-different-section.component.html',
  styleUrl: './tech-stack-think-different-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TechStackThinkDifferentSection { }
