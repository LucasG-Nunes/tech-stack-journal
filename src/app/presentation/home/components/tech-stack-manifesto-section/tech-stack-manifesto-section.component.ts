import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslocoModule } from '@jsverse/transloco';
import { RevealDirective } from '../../../../shared/motion/reveal.directive';
import { GlassAccent, GlassCardComponent } from '../../../../shared/ui/glass-card/glass-card.component';
import { SectionHeaderComponent } from '../../../../shared/ui/section-header/section-header.component';

interface Pillar {
  key: string;
  accent: GlassAccent;
  /** DAILY = já faz parte da rotina; STUDY = em formação (pós em IA). */
  status: 'DAILY' | 'STUDY';
  /** Termos técnicos: neutros de idioma, ficam fora do i18n. */
  tags: string[];
}

/**
 * 01 // MANIFESTO — IA como camada de arquitetura.
 */
@Component({
  selector: 'tech-stack-manifesto-section',
  imports: [TranslocoModule, RevealDirective, GlassCardComponent, SectionHeaderComponent],
  templateUrl: './tech-stack-manifesto-section.component.html',
  styleUrl: './tech-stack-manifesto-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TechStackManifestoSection {
  protected readonly pillars: Pillar[] = [
    { key: 'RAG', accent: 'cyan', status: 'STUDY', tags: ['Embeddings', 'Vector DB', 'Tool calling', 'Guardrails'] },
    { key: 'LLMOPS', accent: 'purple', status: 'STUDY', tags: ['Evals', 'Prompt versioning', 'Tracing', 'Cost / token'] },
    { key: 'ENTERPRISE', accent: 'cyan', status: 'DAILY', tags: ['Kafka', 'Kong', 'Kubernetes', 'Microservices'] },
  ];

  protected readonly pipeline = ['DATA', 'RETRIEVAL', 'LLM', 'GUARDRAILS', 'PROD'];
}
