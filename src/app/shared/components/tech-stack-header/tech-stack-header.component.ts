import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TranslocoModule, TranslocoService } from '@jsverse/transloco';
import { CommonModule } from '@angular/common';
import { TooltipDirective } from '../../directives/custom-tooltip.directive';

@Component({
  selector: 'tech-stack-header',
  standalone: true,
  imports: [CommonModule, TranslocoModule,TooltipDirective],
  templateUrl: './tech-stack-header.component.html',
  styleUrl: './tech-stack-header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TechStackHeaderComponent {
  private translocoService = inject(TranslocoService);

  public get activeLang(): string {
    return this.translocoService.getActiveLang();
  }

  toggleLanguage() {
    const newLang = this.activeLang === 'pt-br' ? 'en-us' : 'pt-br';
    this.translocoService.setActiveLang(newLang);
  }
}