import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TechStackFooterComponent } from './shared/components/tech-stack-footer/tech-stack-footer.component';
import { TechStackHeaderComponent } from './shared/components/tech-stack-header/tech-stack-header.component';
import { SeoService } from './core/services/seo/seo.service';

@Component({
  selector: 'tech-stack-root',
  imports: [RouterOutlet, TechStackFooterComponent, TechStackHeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'tech-stack-journal';
  private seoService = inject(SeoService);

  ngOnInit(): void {
    this.seoService.init();
  }
}