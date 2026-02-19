import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslocoModule } from '@jsverse/transloco';

export interface Article {
  id: string;
  title: string;
  description: string;
  category: string;
  date: string;
  readTime: string;
  views: string;
  slug:string;
  isFeatured?: boolean;
}

@Component({
  selector: 'tech-stack-article-card',
  standalone: true,
  imports: [CommonModule,RouterLink,TranslocoModule],
  templateUrl: './tech-stack-article-card.component.html',
  styleUrls: ['./tech-stack-article-card.component.scss'],
})
export class TechStackArticleCardComponent {
  @Input({ required: true }) article!: Article;
  @Output() viewArticle = new EventEmitter<string>();

  handleArticleClick(event: Event) {
    event.preventDefault();
    this.viewArticle.emit(this.article.slug);
  }
}
