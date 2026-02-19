import { Component } from '@angular/core';
import { TechStackHeroSection } from './components/tech-stack-hero-section/tech-stack-hero-section.component';
import { TechStackThinkDifferentSection } from './components/tech-stack-think-different-section/tech-stack-think-different-section.component';
import { TechStackCaseStudiesComponent } from './components/tech-stack-case-studies/tech-stack-case-studies.component';
import { TechStackSkillsGridComponent } from './components/tech-stack-skills-grid/tech-stack-skills-grid.component';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';
import { TechStackEducationTracker } from '../../shared/components/tech-stack-education-tracker/tech-stack-education-tracker.component';
import { TechStackCollaborationVoicesComponent } from '../../shared/components/tech-stack-collaboration-voices/tech-stack-collaboration-voices.component';

@Component({
  selector: 'tech-stack-home',
  imports: [
    TechStackHeroSection,
    TechStackSkillsGridComponent,
    TechStackCaseStudiesComponent,
    TechStackThinkDifferentSection,
    ScrollRevealDirective,
    TechStackEducationTracker,
    TechStackCollaborationVoicesComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
