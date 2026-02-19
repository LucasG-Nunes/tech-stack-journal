import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CaseStudy, TechStackCaseStudyCardComponent } from './tech-stack-case-study-card/tech-stack-case-study-card.component';
import { CASE_STUDIES } from '../../../../shared/contants/case-studies.constant';
import { TranslocoModule } from '@jsverse/transloco';
import { ModalService } from '../../../../shared/services/ModalService';
import { TechStackProjectDetailsModal } from '../../../../shared/components/tech-stack-project-details-modal/tech-stack-project-details-modal';

@Component({
  selector: 'tech-stack-case-studies',
  standalone: true,
  imports: [CommonModule,TranslocoModule, TechStackCaseStudyCardComponent],
  templateUrl: './tech-stack-case-studies.component.html',
  styleUrls: ['./tech-stack-case-studies.component.scss']
})
export class TechStackCaseStudiesComponent {
  projects: CaseStudy[] = CASE_STUDIES
 modalService  = inject(ModalService)

  public openProjectModal(project: CaseStudy): void {
  this.modalService.open(TechStackProjectDetailsModal, { 
    projectData: project 
  });
}
}