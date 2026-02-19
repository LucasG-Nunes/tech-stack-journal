import { ChangeDetectionStrategy, Component, inject, ViewContainerRef } from '@angular/core';
import {
  Article,
  TechStackArticleCardComponent,
} from '../../../../shared/components/tech-stack-article-card/tech-stack-article-card.component';
import { RECENT_ARTICLES } from '../../../../shared/contants/recent-articles-constant';
import { ScrollRevealDirective } from '../../../../shared/directives/scroll-reveal.directive';
import { TranslocoModule } from '@jsverse/transloco';
import { ModalService } from '../../../../shared/services/ModalService';
import { TechStackUnderConstructionModalComponent } from '../../../../shared/components/tech-stack-under-construction-modal/tech-stack-under-construction-modal.component';

@Component({
  selector: 'tech-stack-recent-articles',
  imports: [TechStackArticleCardComponent, ScrollRevealDirective, TranslocoModule],
  templateUrl: './tech-stack-recent-articles.component.html',
  styleUrl: './tech-stack-recent-articles.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TechStackRecentArticles {
  private modalService = inject(ModalService);
  private vcr = inject(ViewContainerRef);
  public articles: Article[] = RECENT_ARTICLES;

  public onViewAll(): void {
    this.modalService.open(TechStackUnderConstructionModalComponent);
  }

  public callViewArticle(): void {
    this.modalService.open(TechStackUnderConstructionModalComponent);
  }
}
