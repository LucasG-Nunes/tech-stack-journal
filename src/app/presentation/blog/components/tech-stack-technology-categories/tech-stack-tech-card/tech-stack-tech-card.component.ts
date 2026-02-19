import { Component, EventEmitter, Input, Output } from "@angular/core";
import { TechItem } from "../../../../../data/blog/model/category.model";
import { TranslocoModule } from "@jsverse/transloco";
import { ScrollRevealDirective } from "../../../../../shared/directives/scroll-reveal.directive";

@Component({
  selector: 'tech-stack-tech-card',
  imports: [TranslocoModule, ScrollRevealDirective],
  standalone: true,
  templateUrl: './tech-stack-tech-card.component.html',
  styleUrls: ['./tech-stack-tech-card.component.scss'] 
})
export class TechStackTechCardComponent {
  @Input({ required: true }) item!: TechItem;
  @Output() selected = new EventEmitter<string>();

  onClick() { this.selected.emit(this.item.slug); }
}