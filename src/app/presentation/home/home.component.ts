import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TechStackHeroSection } from './components/tech-stack-hero-section/tech-stack-hero-section.component';
import { TechStackManifestoSection } from './components/tech-stack-manifesto-section/tech-stack-manifesto-section.component';
import { TechStackArsenalSection } from './components/tech-stack-arsenal-section/tech-stack-arsenal-section.component';
import { TechStackCaseStudiesComponent } from './components/tech-stack-case-studies/tech-stack-case-studies.component';
import { TechStackSecuritySection } from './components/tech-stack-security-section/tech-stack-security-section.component';
import { TechStackFieldReportsSection } from './components/tech-stack-field-reports-section/tech-stack-field-reports-section.component';
import { TechStackLogsSection } from './components/tech-stack-logs-section/tech-stack-logs-section.component';
import { TechStackContactSection } from './components/tech-stack-contact-section/tech-stack-contact-section.component';

/**
 * Home AXIOM:
 * 00 Hero · 01 Manifesto · 02 Arsenal · 03 Track Record · 04 Segurança
 * 05 Relatórios de campo · 06 Logs · 07 Contato
 */
@Component({
  selector: 'tech-stack-home',
  imports: [
    TechStackHeroSection,
    TechStackManifestoSection,
    TechStackArsenalSection,
    TechStackCaseStudiesComponent,
    TechStackSecuritySection,
    TechStackFieldReportsSection,
    TechStackLogsSection,
    TechStackContactSection,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {}
