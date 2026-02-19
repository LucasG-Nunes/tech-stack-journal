import { Component, inject, OnInit } from '@angular/core';
import { TechStackBlogHeroSection } from './components/tech-stack-blog-hero-section/tech-stack-blog-hero-section.component';
import { TechStackTechnologyCategories } from './components/tech-stack-technology-categories/tech-stack-technology-categories.component';
import { TechStackRecentArticles } from './components/tech-stack-recent-articles/tech-stack-recent-articles.component';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';
import { SeoService } from '../../core/services/seo/seo.service';
import { environment } from '../../../environments/environment';
import { TranslocoService } from '@jsverse/transloco';

@Component({
  selector: 'tech-stack-blog',
  imports: [TechStackBlogHeroSection, TechStackTechnologyCategories, TechStackRecentArticles, ScrollRevealDirective],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss',
})
export class BlogComponent implements OnInit {
  public isModalOpen = false;
  public techCategories = [
    {
      id: 'web2',
      title: 'Web 2 Development',
      icon: '🌐',
      description: 'Desenvolvimento web moderno com foco em performance e experiência do usuário',
      technologies: [
        { id: 'typescript', name: 'TypeScript', icon: '🔷', description: 'Tipagem estática para JavaScript', articles: 0 },
        { id: 'angular', name: 'Angular 17', icon: '🅰️', description: 'Framework enterprise com standalone components', articles: 0 },
        { id: 'react', name: 'React', icon: '⚛️', description: 'Biblioteca para interfaces de usuário', articles: 0 },
        { id: 'nextjs', name: 'Next.js', icon: '▲', description: 'Framework React para produção', articles: 0 },
        { id: 'nodejs', name: 'Node.js', icon: '🟢', description: 'Runtime JavaScript server-side', articles: 0 },
        { id: 'nestjs', name: 'NestJS', icon: '🐈', description: 'Framework Node.js escalável', articles: 0 },
        { id: 'frontend', name: 'Frontend Tools', icon: '🎨', description: 'HTML5, CSS3, SASS/SCSS, RxJS, Storybook', articles: 0 },
      ],
    },
    {
      id: 'cloud',
      title: 'Cloud & DevOps',
      icon: '☁️',
      description: 'Infraestrutura moderna e pipeline de desenvolvimento',
      technologies: [
        { id: 'aws', name: 'AWS Cloud', icon: '🟠', description: 'S3, CloudFront, Lambda, API Gateway, DynamoDB', articles: 0 },
        { id: 'docker', name: 'Docker', icon: '🐳', description: 'Containerização de aplicações', articles: 0 },
        { id: 'cicd', name: 'CI/CD', icon: '🔄', description: 'GitLab CI/CD, GitHub Actions', articles: 0 },
      ],
    },
    {
      id: 'web3',
      title: 'Web3 & Blockchain',
      icon: '⛓️',
      description: 'Desenvolvimento descentralizado e contratos inteligentes',
      technologies: [
        { id: 'solidity', name: 'Solidity', icon: '💎', description: 'Linguagem para smart contracts', articles: 0 },
        { id: 'hardhat', name: 'Hardhat', icon: '⚡', description: 'Ambiente de desenvolvimento Ethereum', articles: 0 },
        { id: 'web3js', name: 'Web3 Libraries', icon: '🌐', description: 'Web3.js, Ethers.js, OpenZeppelin', articles: 0 },
        { id: 'dapp', name: 'dApp Development', icon: '🦊', description: 'MetaMask, WalletConnect integration', articles: 0 },
      ],
    },
    {
      id: 'testing',
      title: 'Testing & Quality',
      icon: '🧪',
      description: 'Garantia de qualidade e testes automatizados',
      technologies: [
        { id: 'jest', name: 'Jest', icon: '🃏', description: 'Framework de testes JavaScript', articles: 0 },
        { id: 'angular-testing', name: 'Angular Testing', icon: '🔬', description: 'Karma, Jasmine para Angular', articles: 0 },
        {
          id: 'testing-strategies',
          name: 'Testing Strategies',
          icon: '📊',
          description: 'Unit testing & Integration testing',
          articles: 0,
        },
      ],
    },
  ];

  public seoService = inject(SeoService);
  private translocoService = inject(TranslocoService);

  public ngOnInit(): void {
    const title = this.translocoService.translate('BLOG.BREADCRUMB');
    const description = this.translocoService.translate('BLOG.ROLE_SUBTITLE');

    this.seoService.updateMetaTags({
      title: `${title} | Engineering Lab`,
      description: description,
      ogImage: `${environment.baseUrl}/assets/images/og-img.png`,
    });
  }

  public recentArticles = [
    {
      id: '1',
      title: 'Standalone Components no Angular 17: O Futuro do Angular',
      description: 'Descubra como os standalone components revolucionaram o desenvolvimento Angular...',
      technology: 'Angular',
      date: '15 Dez 2024',
      readTime: '5 min de leitura',
      views: 234,
      featured: true,
    },
    {
      id: '2',
      title: 'Integrando MetaMask em Aplicações React',
      description: 'Guia completo para conectar wallets em suas dApps...',
      technology: 'Web3',
      date: '12 Dez 2024',
      readTime: '8 min de leitura',
      views: 189,
      featured: false,
    },
    {
      id: '3',
      title: 'Deploy Automático com AWS Lambda e API Gateway',
      description: 'Configurando infraestrutura serverless na AWS...',
      technology: 'AWS',
      date: '10 Dez 2024',
      readTime: '7 min de leitura',
      views: 156,
      featured: false,
    },
    {
      id: '4',
      title: 'Advanced TypeScript: Conditional Types e Utility Types',
      description: 'Dominando recursos avançados do TypeScript para código mais robusto...',
      technology: 'TypeScript',
      date: '8 Dez 2024',
      readTime: '6 min de leitura',
      views: 298,
      featured: false,
    },
  ];

  openConstructionModal() {
    this.isModalOpen = true;
  }
}
