import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslocoModule, TranslocoService } from '@jsverse/transloco';

interface Testimonial {
  id: string;
  url: string;
  name: string;
}

@Component({
  selector: 'tech-stack-collaboration-voices',
  standalone: true,
  imports: [CommonModule, TranslocoModule],
  templateUrl: './tech-stack-collaboration-voices.component.html',
  styleUrl: './tech-stack-collaboration-voices.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TechStackCollaborationVoicesComponent {
  private translocoService = inject(TranslocoService);
  public readonly linkedinUrl = 'https://www.linkedin.com/in/lucas-gnunes/details/recommendations/';

  // Getter para o template saber qual idioma está ativo
  get activeLang(): string {
    return this.translocoService.getActiveLang();
  }

  public testimonialPrints: Testimonial[] = [
    { id: 'ELENICE', url: 'assets/images/testimonials/elenice-peruchini.png', name: 'Elenice Peruchini' },
    { id: 'SAMIRA', url: 'assets/images/testimonials/samira-wanderley.png', name: 'Samira Geraissate' },
    { id: 'CARLOS', url: 'assets/images/testimonials/carlos-nonnemacher.png', name: 'Carlos Henrique Nonnemacher' },
    { id: 'EDSON', url: 'assets/images/testimonials/edson-scholze.png', name: 'Edson Luiz Scholze Junior' },
    { id: 'RENAN', url: 'assets/images/testimonials/renan-alysonn.png', name: 'Renan Alyson Camara' },
    { id: 'ALEXSANDER', url: 'assets/images/testimonials/alexsander-oliveira.png', name: 'Alexsander Oliveira' },
    { id: 'MARCOS', url: 'assets/images/testimonials/marcos-paulo.png', name: 'Marcos Paulo' },
    { id: 'JESSICA', url: 'assets/images/testimonials/jessica-sordi.png', name: 'Jéssica Sordi' },
    { id: 'RHANNA', url: 'assets/images/testimonials/rhanna-oliveiraa.png', name: 'Rhanna Oliveira' },
    { id: 'ADRIANE', url: 'assets/images/testimonials/adriane-lisboa.png', name: 'Adriane Reis lisboa' },
  ];
}