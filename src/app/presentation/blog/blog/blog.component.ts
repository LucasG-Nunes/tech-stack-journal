import { Component } from '@angular/core';

@Component({
  selector: 'tech-stack-blog',
  imports: [],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss',
})
export class BlogComponent {

  public techCategories = [
    {
      id: 'web2',
      title: 'Web 2 Development',
      icon: '🌐',
      description: 'Desenvolvimento web moderno com foco em performance e experiência do usuário',
      technologies: [
        { id: 'typescript', name: 'TypeScript', icon: '🔷', description: 'Tipagem estática para JavaScript', articles: 3 },
        { id: 'angular', name: 'Angular 17', icon: '🅰️', description: 'Framework enterprise com standalone components', articles: 5 },
        { id: 'react', name: 'React', icon: '⚛️', description: 'Biblioteca para interfaces de usuário', articles: 4 },
        { id: 'nextjs', name: 'Next.js', icon: '▲', description: 'Framework React para produção', articles: 2 },
        { id: 'nodejs', name: 'Node.js', icon: '🟢', description: 'Runtime JavaScript server-side', articles: 4 },
        { id: 'nestjs', name: 'NestJS', icon: '🐈', description: 'Framework Node.js escalável', articles: 3 },
        { id: 'frontend', name: 'Frontend Tools', icon: '🎨', description: 'HTML5, CSS3, SASS/SCSS, RxJS, Storybook', articles: 6 }
      ]
    },
    {
      id: 'cloud',
      title: 'Cloud & DevOps',
      icon: '☁️',
      description: 'Infraestrutura moderna e pipeline de desenvolvimento',
      technologies: [
        { id: 'aws', name: 'AWS Cloud', icon: '🟠', description: 'S3, CloudFront, Lambda, API Gateway, DynamoDB', articles: 4 },
        { id: 'docker', name: 'Docker', icon: '🐳', description: 'Containerização de aplicações', articles: 3 },
        { id: 'cicd', name: 'CI/CD', icon: '🔄', description: 'GitLab CI/CD, GitHub Actions', articles: 2 }
      ]
    },
    {
      id: 'web3',
      title: 'Web3 & Blockchain',
      icon: '⛓️',
      description: 'Desenvolvimento descentralizado e contratos inteligentes',
      technologies: [
        { id: 'solidity', name: 'Solidity', icon: '💎', description: 'Linguagem para smart contracts', articles: 3 },
        { id: 'hardhat', name: 'Hardhat', icon: '⚡', description: 'Ambiente de desenvolvimento Ethereum', articles: 2 },
        { id: 'web3js', name: 'Web3 Libraries', icon: '🌐', description: 'Web3.js, Ethers.js, OpenZeppelin', articles: 4 },
        { id: 'dapp', name: 'dApp Development', icon: '🦊', description: 'MetaMask, WalletConnect integration', articles: 3 }
      ]
    },
    {
      id: 'testing',
      title: 'Testing & Quality',
      icon: '🧪',
      description: 'Garantia de qualidade e testes automatizados',
      technologies: [
        { id: 'jest', name: 'Jest', icon: '🃏', description: 'Framework de testes JavaScript', articles: 2 },
        { id: 'angular-testing', name: 'Angular Testing', icon: '🔬', description: 'Karma, Jasmine para Angular', articles: 3 },
        { id: 'testing-strategies', name: 'Testing Strategies', icon: '📊', description: 'Unit testing & Integration testing', articles: 2 }
      ]
    }
  ];


  public recentArticles = [
    {
      id: '1',
      title: 'Standalone Components no Angular 17: O Futuro do Angular',
      description: 'Descubra como os standalone components revolucionaram o desenvolvimento Angular...',
      technology: 'Angular',
      date: '15 Dez 2024',
      readTime: '5 min de leitura',
      views: 234,
      featured: true
    },
    {
      id: '2',
      title: 'Integrando MetaMask em Aplicações React',
      description: 'Guia completo para conectar wallets em suas dApps...',
      technology: 'Web3',
      date: '12 Dez 2024',
      readTime: '8 min de leitura',
      views: 189,
      featured: false
    },
    {
      id: '3',
      title: 'Deploy Automático com AWS Lambda e API Gateway',
      description: 'Configurando infraestrutura serverless na AWS...',
      technology: 'AWS',
      date: '10 Dez 2024',
      readTime: '7 min de leitura',
      views: 156,
      featured: false
    },
    {
      id: '4',
      title: 'Advanced TypeScript: Conditional Types e Utility Types',
      description: 'Dominando recursos avançados do TypeScript para código mais robusto...',
      technology: 'TypeScript',
      date: '8 Dez 2024',
      readTime: '6 min de leitura',
      views: 298,
      featured: false
    }
  ];
}
