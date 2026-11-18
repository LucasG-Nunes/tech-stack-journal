import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslocoModule } from '@jsverse/transloco';
import { TechStackUnderConstructionModalComponent } from '../../../../shared/components/tech-stack-under-construction-modal/tech-stack-under-construction-modal.component';
import { ENGINEERING_LOGS, EngineeringLog } from '../../../../shared/contants/engineering-logs.constant';
import { RevealDirective } from '../../../../shared/motion/reveal.directive';
import { ModalService } from '../../../../shared/services/ModalService';
import { LogCardComponent } from '../../../../shared/ui/log-card/log-card.component';
import { SectionHeaderComponent } from '../../../../shared/ui/section-header/section-header.component';

/**
 * 06 // LOGS DE ENGENHARIA — prévia de 3 logs (destaque + 2) e link para /blog.
 * Logs em redação abrem o aviso "em redação".
 */
@Component({
  selector: 'tech-stack-logs-section',
  imports: [TranslocoModule, RouterLink, RevealDirective, LogCardComponent, SectionHeaderComponent],
  templateUrl: './tech-stack-logs-section.component.html',
  styleUrl: './tech-stack-logs-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TechStackLogsSection {
  private readonly modalService = inject(ModalService);

  /** Destaque primeiro; depois um log de arquitetura e um de IA para mostrar o leque. */
  protected readonly logs: EngineeringLog[] = [
    ENGINEERING_LOGS.find(log => log.featured),
    ENGINEERING_LOGS.find(log => log.id === 'KAFKA'),
    ENGINEERING_LOGS.find(log => log.id === 'AI_BANK'),
  ].filter((log): log is EngineeringLog => !!log);

  protected openLog(): void {
    this.modalService.open(TechStackUnderConstructionModalComponent);
  }
}
