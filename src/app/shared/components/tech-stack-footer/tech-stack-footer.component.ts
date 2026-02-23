import { Component } from '@angular/core';
import { TranslocoModule } from '@jsverse/transloco';
import { TooltipDirective } from "../../directives/custom-tooltip.directive";

@Component({
  selector: 'tech-stack-footer',
  imports: [TranslocoModule, TooltipDirective],
  templateUrl: './tech-stack-footer.component.html',
  styleUrl: './tech-stack-footer.component.scss'
})
export class TechStackFooterComponent {

}
