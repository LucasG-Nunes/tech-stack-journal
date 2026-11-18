import { ChangeDetectionStrategy, Component, ElementRef, viewChild } from '@angular/core';
import { TranslocoModule } from '@jsverse/transloco';
import { PROFILE_LINKS } from '../../../../shared/contants/profile-links.constant';
import { RevealDirective } from '../../../../shared/motion/reveal.directive';
import { TickerDirective } from '../../../../shared/motion/ticker.directive';
import { GlassCardComponent } from '../../../../shared/ui/glass-card/glass-card.component';
import { SectionHeaderComponent } from '../../../../shared/ui/section-header/section-header.component';

interface Testimonial {
  /** Chave em VOICES.TESTIMONIALS. */
  id: string;
  name: string;
  /** Relação no momento da recomendação (conforme o LinkedIn). */
  relation: 'MANAGER' | 'TEAM';
  /** Print original da recomendação no LinkedIn. */
  print: string;
}

type EducationStatus = 'COMPLETED' | 'IN_PROGRESS' | 'PAUSED';

interface EducationEntry {
  /** Chave em EDUCATION.COURSES. */
  course: string;
  status: EducationStatus;
  /** Progresso 0–100 calculado por período; ausente quando não há datas. */
  progress?: number;
  /** Chave i18n da data prevista de conclusão. */
  expected?: string;
  /** Chave i18n de observação curta (ex.: tempo restante). */
  note?: string;
  document?: string;
  highlight?: boolean;
}

/** Progresso linear entre duas datas, limitado a 0–100. */
function progressBetween(start: string, end: string, now = Date.now()): number {
  const from = new Date(start).getTime();
  const to = new Date(end).getTime();
  return Math.round(Math.min(1, Math.max(0, (now - from) / (to - from))) * 100);
}

/**
 * 05 // RELATÓRIOS DE CAMPO — recomendações do LinkedIn (rail com scroll-snap)
 * + linha do tempo de formação contínua.
 */
@Component({
  selector: 'tech-stack-field-reports-section',
  imports: [TranslocoModule, RevealDirective, TickerDirective, GlassCardComponent, SectionHeaderComponent],
  templateUrl: './tech-stack-field-reports-section.component.html',
  styleUrl: './tech-stack-field-reports-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TechStackFieldReportsSection {
  protected readonly linkedinUrl = `${PROFILE_LINKS.linkedin}/details/recommendations/`;

  protected readonly testimonials: Testimonial[] = [
    // Cargos e relação extraídos dos prints originais (assets/images/testimonials).
    { id: 'ELENICE', name: 'Elenice Peruchini', relation: 'MANAGER', print: 'assets/images/testimonials/elenice-peruchini.png' },
    { id: 'SAMIRA', name: 'Samira Geraissate Wanderley', relation: 'MANAGER', print: 'assets/images/testimonials/samira-wanderley.png' },
    { id: 'CARLOS', name: 'Carlos Henrique Nonnemacher', relation: 'TEAM', print: 'assets/images/testimonials/carlos-nonnemacher.png' },
    { id: 'EDSON', name: 'Edson Luiz Scholze Junior', relation: 'TEAM', print: 'assets/images/testimonials/edson-scholze.png' },
    { id: 'RENAN', name: 'Renan Alyson Camara', relation: 'TEAM', print: 'assets/images/testimonials/renan-alysonn.png' },
    { id: 'ALEXSANDER', name: 'Alexsander Oliveira', relation: 'TEAM', print: 'assets/images/testimonials/alexsander-oliveira.png' },
    { id: 'MARCOS', name: 'Marcos Paulo', relation: 'TEAM', print: 'assets/images/testimonials/marcos-paulo.png' },
    { id: 'JESSICA', name: 'Jéssica Sordi', relation: 'TEAM', print: 'assets/images/testimonials/jessica-sordi.png' },
    { id: 'RHANNA', name: 'Rhanna Oliveira', relation: 'TEAM', print: 'assets/images/testimonials/rhanna-oliveiraa.png' },
    { id: 'ADRIANE', name: 'Adriane Reis Lisboa', relation: 'TEAM', print: 'assets/images/testimonials/adriane-lisboa.png' },
  ];

  protected readonly education: EducationEntry[] = [
    { course: 'ADS', status: 'COMPLETED', progress: 100, document: 'assets/docs/diploma-ads.pdf' },
    // Trancado: sem barra de progresso por data (não avança enquanto pausado).
    { course: 'SOFTWARE_ENG', status: 'PAUSED', note: 'EDUCATION.NOTES.SOFTWARE_ENG' },
    {
      course: 'AI_POSTGRAD',
      status: 'IN_PROGRESS',
      progress: progressBetween('2026-11-01', '2027-06-30'),
      expected: 'EDUCATION.DATES.AI_POSTGRAD',
      highlight: true,
    },
  ];

  private readonly rail = viewChild.required<ElementRef<HTMLElement>>('rail');

  /** Navega um card por vez no rail. */
  protected scrollRail(direction: 1 | -1): void {
    const rail = this.rail().nativeElement;
    const card = rail.querySelector<HTMLElement>('li');
    const step = card ? card.offsetWidth + 16 : rail.clientWidth * 0.8;
    rail.scrollBy({ left: step * direction, behavior: 'smooth' });
  }

  protected initials(name: string): string {
    const parts = name.split(' ');
    return (parts[0][0] + (parts[parts.length - 1][0] ?? '')).toUpperCase();
  }
}
