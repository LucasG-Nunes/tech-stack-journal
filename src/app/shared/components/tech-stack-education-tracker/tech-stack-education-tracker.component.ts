import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslocoModule } from '@jsverse/transloco';

@Component({
  selector: 'tech-stack-education-tracker',
  standalone: true,
  imports: [CommonModule,TranslocoModule],
  templateUrl: './tech-stack-education-tracker.component.html',
  styleUrl: './tech-stack-education-tracker.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TechStackEducationTracker implements OnInit {
  public currentProgress: number = 0;

  ngOnInit(): void {
    this.calculateProgress();
  }

  private calculateProgress(): void {
    const startDate = new Date('2024-01-01').getTime();
    const endDate = new Date('2028-12-31').getTime();
    const today = new Date().getTime();

    if (today < startDate) {
      this.currentProgress = 0;
    } else if (today > endDate) {
      this.currentProgress = 100;
    } else {
      const totalDuration = endDate - startDate;
      const elapsed = today - startDate;
      this.currentProgress = Math.round((elapsed / totalDuration) * 100);
    }
  }
}