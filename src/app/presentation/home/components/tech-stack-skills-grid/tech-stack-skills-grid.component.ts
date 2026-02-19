import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { TechIconComponent } from '../../../../shared/components/tech-stack-icon/tech-stack-icon.component';
import { SKILLS_DATA } from '../../../../shared/contants/skills-grid.constant';
import { ScrollRevealDirective } from "../../../../shared/directives/scroll-reveal.directive";
import { TranslocoModule } from '@jsverse/transloco';


@Component({
  selector: 'tech-stack-skills-grid',
  standalone: true,
  imports: [CommonModule,TranslocoModule, TechIconComponent, ScrollRevealDirective],
  templateUrl: './tech-stack-skills-grid.component.html',
  styleUrls: ['./tech-stack-skills-grid.component.scss']
})
export class TechStackSkillsGridComponent {
private sanitizer = inject(DomSanitizer);
  
  readonly skills = SKILLS_DATA.map(skill => ({
    ...skill,
    svg: this.sanitizer.bypassSecurityTrustHtml(skill.svgRaw)
  }));
}