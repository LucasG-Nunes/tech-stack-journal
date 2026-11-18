import { ChangeDetectionStrategy, Component, EventEmitter, HostListener, Output } from '@angular/core';
import { TranslocoModule } from '@jsverse/transloco';
import { PROFILE_LINKS } from '../../contants/profile-links.constant';

/**
 * Aviso "log em redação" (AXIOM). Aberto pelo ModalService, que escuta `closed`.
 * Fecha com Esc, clique fora, ✕ ou "Entendido".
 */
@Component({
  selector: 'tech-stack-under-construction-modal',
  imports: [TranslocoModule],
  templateUrl: './tech-stack-under-construction-modal.component.html',
  styleUrl: './tech-stack-under-construction-modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TechStackUnderConstructionModalComponent {
  @Output() closed = new EventEmitter<void>();

  protected readonly linkedin = PROFILE_LINKS.linkedin;

  @HostListener('window:keydown.escape')
  close(): void {
    this.closed.emit();
  }
}
