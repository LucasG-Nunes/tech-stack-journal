import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TranslocoModule } from '@jsverse/transloco';
import { CaseStudy, TechStackCaseStudyCardComponent } from './tech-stack-case-study-card/tech-stack-case-study-card.component';
import { CASE_STUDIES } from '../../../../shared/contants/case-studies.constant';
import { ModalService } from '../../../../shared/services/ModalService';
import { TechStackProjectDetailsModal } from '../../../../shared/components/tech-stack-project-details-modal/tech-stack-project-details-modal';
import { RevealDirective } from '../../../../shared/motion/reveal.directive';
import { SectionHeaderComponent } from '../../../../shared/ui/section-header/section-header.component';

/**
 * 03 // TRACK RECORD — bento grid de dossiês com tilt 3D; abre o modal de detalhes.
 */
@Component({
  selector: 'tech-stack-case-studies',
  standalone: true,
  imports: [TranslocoModule, TechStackCaseStudyCardComponent, RevealDirective, SectionHeaderComponent],
  templateUrl: './tech-stack-case-studies.component.html',
  styleUrls: ['./tech-stack-case-studies.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TechStackCaseStudiesComponent {
  protected readonly projects: CaseStudy[] = CASE_STUDIES;
  private readonly modalService = inject(ModalService);

  protected openProjectModal(project: CaseStudy): void {
    this.modalService.open(TechStackProjectDetailsModal, { projectData: project });
  }
}
