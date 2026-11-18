import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { TranslocoModule } from '@jsverse/transloco';
import { TickerDirective } from '../../../../../shared/motion/ticker.directive';
import { TiltDirective } from '../../../../../shared/motion/tilt.directive';
import { GlassAccent, GlassCardComponent } from '../../../../../shared/ui/glass-card/glass-card.component';

export type MockupType = 'mobile' | 'dashboard' | 'widgets' | '3d' | 'entertainment';
export type CaseSector = 'FINANCE' | 'JUDICIARY' | 'SAAS' | 'RND';
export type CaseClassification = 'CRITICAL' | 'PRODUCT' | 'LAB';

export interface CaseMetric {
  value: number;
  prefix?: string;
  suffix?: string;
  /** Chave i18n do rótulo. */
  label: string;
}

export interface CaseStudy {
  /** Chave i18n no formato PROJECTS.ITEMS.<KEY>.TITLE (o modal deriva a KEY daqui). */
  title: string;
  description: string;
  /** Logo; sem logo no projeto, o card mostra o monograma. */
  imageUrl?: string;
  /** Iniciais exibidas quando não há imageUrl. */
  monogram?: string;
  /** Atuação atual: ganha selo "Atual". */
  current?: boolean;
  sector: CaseSector;
  classification: CaseClassification;
  /** Nomes próprios de tecnologia, sem i18n. */
  stack: string[];
  /** Colunas ocupadas no bento grid de 12. */
  span: number;
  accent?: GlassAccent;
  metric?: CaseMetric;
  /** Legado, ainda lido pelo modal de detalhes. */
  type?: MockupType;
  gradientClass?: string;
}

/**
 * Dossiê de projeto (card glass + tilt 3D).
 * O host recebe o reveal em cascata do pai; o tilt fica no card interno para
 * que os transforms das duas animações não se sobrescrevam.
 */
@Component({
  selector: 'tech-stack-case-study-card',
  standalone: true,
  imports: [TranslocoModule, GlassCardComponent, TiltDirective, TickerDirective],
  templateUrl: './tech-stack-case-study-card.component.html',
  styleUrls: ['./tech-stack-case-study-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[style.--span]': 'data().span',
  },
})
export class TechStackCaseStudyCardComponent {
  readonly data = input.required<CaseStudy>();
  readonly projectOpened = output<CaseStudy>();

  protected open(): void {
    this.projectOpened.emit(this.data());
  }
}
