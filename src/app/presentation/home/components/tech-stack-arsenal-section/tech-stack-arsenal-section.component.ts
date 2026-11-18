import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslocoModule } from '@jsverse/transloco';
import { RevealDirective } from '../../../../shared/motion/reveal.directive';
import { GlassAccent, GlassCardComponent } from '../../../../shared/ui/glass-card/glass-card.component';
import { SectionHeaderComponent } from '../../../../shared/ui/section-header/section-header.component';

interface ArsenalDomain {
  key: string;
  accent: GlassAccent;
  /** Chaves de ARSENAL.ITEMS.* — o nome da tecnologia também vem do i18n. */
  items: string[];
}

/**
 * 02 // ARSENAL — stack principal agrupada por domínio + faixa "também em campo".
 */
@Component({
  selector: 'tech-stack-arsenal-section',
  imports: [TranslocoModule, RevealDirective, GlassCardComponent, SectionHeaderComponent],
  templateUrl: './tech-stack-arsenal-section.component.html',
  styleUrl: './tech-stack-arsenal-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TechStackArsenalSection {
  protected readonly domains: ArsenalDomain[] = [
    { key: 'ARCH', accent: 'cyan', items: ['MICROSERVICES', 'MICROFRONTENDS', 'KONG'] },
    { key: 'INFRA', accent: 'purple', items: ['AWS', 'KUBERNETES', 'KAFKA'] },
    { key: 'AI', accent: 'cyan', items: ['PYTHON', 'LLMS', 'GENAI'] },
  ];

  /**
   * Etiqueta honesta por tecnologia: DAILY = rotina real (Sicredi);
   * STUDY = em formação (pós em IA). Sem etiqueta = uso pontual/projetos.
   */
  protected readonly usage: Record<string, 'DAILY' | 'STUDY'> = {
    MICROSERVICES: 'DAILY',
    KONG: 'DAILY',
    KUBERNETES: 'DAILY',
    KAFKA: 'DAILY',
    PYTHON: 'STUDY',
    LLMS: 'STUDY',
    GENAI: 'STUDY',
  };

  /** Stack complementar já usada nos cases publicados (nomes próprios, sem i18n). */
  protected readonly fieldKit = [
    'TypeScript',
    'Angular',
    'Signals · RxJS',
    'React',
    'Next.js',
    'Node.js',
    'NestJS',
    'Java · Spring Boot',
    'Docker',
    'GitLab CI/CD',
    'Cloudflare Edge',
  ];
}
