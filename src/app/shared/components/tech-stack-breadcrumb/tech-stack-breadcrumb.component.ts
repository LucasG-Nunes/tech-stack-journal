import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

export interface BreadcrumbLink {
  label: string;
  path: string;
}

@Component({
  selector: 'tech-stack-breadcrumb',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './tech-stack-breadcrumb.component.html',
  styleUrl: './tech-stack-breadcrumb.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TechStackBreadcrumb {
  @Input() items: BreadcrumbLink[] = [];
  @Input() current: string = '';
}
