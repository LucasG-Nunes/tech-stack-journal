import { Component, inject, Input, ViewContainerRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TechStackTechCardComponent } from '../../../presentation/blog/components/tech-stack-technology-categories/tech-stack-tech-card/tech-stack-tech-card.component';
import { TechCategory } from '../../../data/blog/model/category.model';
import { ScrollRevealDirective } from '../../directives/scroll-reveal.directive';
import { TranslocoModule } from '@jsverse/transloco';
import { ModalService } from '../../services/ModalService';
import { TechStackUnderConstructionModalComponent } from '../tech-stack-under-construction-modal/tech-stack-under-construction-modal.component';

@Component({
  selector: 'tech-stack-category-block',
  standalone: true,
  imports: [CommonModule, TechStackTechCardComponent, ScrollRevealDirective, TranslocoModule],
  templateUrl: './tech-stack-category-block.component.html',
  styleUrls: ['./tech-stack-category-block.component.scss'],
})
export class TechStackCategoryBlockComponent {
  @Input({ required: true }) category!: TechCategory;
  private modalService = inject(ModalService);
  private vcr = inject(ViewContainerRef);

  public callCardSelected(event: string): void {
    console.log(event);
    this.modalService.open(TechStackUnderConstructionModalComponent);
  }
}
