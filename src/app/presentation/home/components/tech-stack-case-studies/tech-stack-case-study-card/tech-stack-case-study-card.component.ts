import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslocoModule } from '@jsverse/transloco';

export type MockupType = 'mobile' | 'dashboard' | 'widgets' | '3d' | 'entertainment';

export interface CaseStudy {
  title: string;
  description: string;
  type?: MockupType;
  gradientClass?: string;
  gridArea: string;
  imageUrl:string;
}

@Component({
  selector: 'tech-stack-case-study-card',
  standalone: true,
  imports: [CommonModule,TranslocoModule],
  templateUrl: './tech-stack-case-study-card.component.html',
  styleUrls: ['./tech-stack-case-study-card.component.scss']
})
export class TechStackCaseStudyCardComponent {
  @Input({ required: true }) data!: CaseStudy;
  @Output() projectOpened = new EventEmitter<CaseStudy>();

public handleProjectClick(): void {
  this.projectOpened.emit(this.data);
}
}