import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TechStackCategoryBlockComponent } from '../../../../shared/components/tech-stack-category-block/tech-stack-category-block.component';
import { TechCategory } from '../../../../data/blog/model/category.model';
import { TECHNOLOGY_CATEGORIES } from '../../../../shared/contants/technology-categories.constant';
import { ScrollRevealDirective } from '../../../../shared/directives/scroll-reveal.directive';
import { TranslocoModule } from '@jsverse/transloco';

@Component({
  selector: 'tech-stack-technology-categories',
  standalone: true,
  imports: [CommonModule, TechStackCategoryBlockComponent,ScrollRevealDirective, TranslocoModule],
  templateUrl: './tech-stack-technology-categories.component.html',
  styleUrl: './tech-stack-technology-categories.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TechStackTechnologyCategories {
  readonly categories: TechCategory[] = TECHNOLOGY_CATEGORIES;
}
