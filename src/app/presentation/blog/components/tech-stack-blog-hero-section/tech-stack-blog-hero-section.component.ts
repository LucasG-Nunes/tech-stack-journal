import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TechStackBreadcrumb } from "../../../../shared/components/tech-stack-breadcrumb/tech-stack-breadcrumb.component";
import { TechStatItem } from "../../../../shared/components/tech-stack-stat-item/tech-stack-stat-item.component";
import { TranslocoModule } from '@jsverse/transloco';

@Component({
  selector: 'tech-stack-blog-hero-section',
  imports: [TechStackBreadcrumb, TechStatItem,TranslocoModule],
  templateUrl: './tech-stack-blog-hero-section.component.html',
  styleUrl: './tech-stack-blog-hero-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TechStackBlogHeroSection { }
