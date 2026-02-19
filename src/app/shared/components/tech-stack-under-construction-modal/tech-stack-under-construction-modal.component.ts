import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { TranslocoModule } from '@jsverse/transloco';

@Component({
  selector: 'tech-stack-under-construction-modal',
  imports: [TranslocoModule],
  templateUrl: './tech-stack-under-construction-modal.component.html',
  styleUrl: './tech-stack-under-construction-modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TechStackUnderConstructionModalComponent { 

  @Output() closed = new EventEmitter<void>();
  close() { this.closed.emit(); }
}
