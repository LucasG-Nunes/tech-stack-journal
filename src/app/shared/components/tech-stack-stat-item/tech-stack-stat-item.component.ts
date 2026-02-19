import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'tech-stack-stat-item',
  imports: [],
  templateUrl: './tech-stack-stat-item.component.html',
  styleUrl: './tech-stack-stat-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TechStatItem {
  @Input({ required: true }) value!: string;
  @Input({ required: true }) label!: string;
}
