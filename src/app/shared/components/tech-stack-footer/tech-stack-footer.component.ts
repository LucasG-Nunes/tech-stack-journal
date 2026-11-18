import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslocoModule } from '@jsverse/transloco';
import { HOME_ANCHORS, PROFILE_LINKS } from '../../contants/profile-links.constant';

/**
 * Footer AXIOM: marca + navegação + canais + status, e um wordmark gigante
 * em contorno fechando a página.
 */
@Component({
  selector: 'tech-stack-footer',
  standalone: true,
  imports: [TranslocoModule, RouterLink],
  templateUrl: './tech-stack-footer.component.html',
  styleUrl: './tech-stack-footer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TechStackFooterComponent {
  protected readonly anchors = HOME_ANCHORS;
  protected readonly links = PROFILE_LINKS;
  protected readonly year = new Date().getFullYear();

  protected backToTop(): void {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
  }
}
