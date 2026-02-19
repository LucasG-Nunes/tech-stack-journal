import { ChangeDetectionStrategy, Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { CaseStudy } from '../../../presentation/home/components/tech-stack-case-studies/tech-stack-case-study-card/tech-stack-case-study-card.component';
import { TranslocoModule } from '@jsverse/transloco';

@Component({
  selector: 'tech-stack-project-details-modal',
  imports: [TranslocoModule],
  templateUrl: 'tech-stack-project-details-modal.html',
  styleUrl: './tech-stack-project-details-modal.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TechStackProjectDetailsModal {
  @Input() projectData!: CaseStudy;
  @Output() closed = new EventEmitter<void>();

  isMaximized = false;

  @HostListener('window:keydown.escape')
  onEscape() {
    this.close();
  }

  toggleMaximize() {
    this.isMaximized = !this.isMaximized;
  }

  close() {
    this.closed.emit();
  }
  
  getProjectKey(): string {
    const parts = this.projectData.title.split('.');
    return parts[parts.length - 2];
  }
}
