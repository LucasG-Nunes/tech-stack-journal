import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslocoModule } from '@jsverse/transloco';
import { ScrollRevealDirective } from '../../../../shared/directives/scroll-reveal.directive';

@Component({
  selector: 'tech-stack-hero-section',
  imports: [TranslocoModule, ScrollRevealDirective],
  templateUrl: './tech-stack-hero-section.component.html',
  styleUrl: './tech-stack-hero-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TechStackHeroSection {}
