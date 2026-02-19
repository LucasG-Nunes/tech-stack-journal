import { TechCategory } from "../../data/blog/model/category.model";

export const TECHNOLOGY_CATEGORIES: TechCategory[] = [
  {
    id: 'cat-web2',
    title: 'BLOG.CATEGORIES_SECTION.LIST.WEB2.TITLE',
    icon: '🌐',
    description: 'BLOG.CATEGORIES_SECTION.LIST.WEB2.DESC',
    items: [
      { id: 'tech-ts', icon: '🔷', name: 'TypeScript', description: 'BLOG.CATEGORIES_SECTION.LIST.WEB2.ITEMS.TS', articleCount: 0, slug: 'typescript' },
      { id: 'tech-ang', icon: '🅰️', name: 'Angular 17', description: 'BLOG.CATEGORIES_SECTION.LIST.WEB2.ITEMS.ANG', articleCount: 0, slug: 'angular' },
      { id: 'tech-react', icon: '⚛️', name: 'React', description: 'BLOG.CATEGORIES_SECTION.LIST.WEB2.ITEMS.REACT', articleCount: 0, slug: 'react' },
      { id: 'tech-next', icon: '▲', name: 'Next.js', description: 'BLOG.CATEGORIES_SECTION.LIST.WEB2.ITEMS.NEXT', articleCount: 0, slug: 'nextjs' },
      { id: 'tech-node', icon: '🟢', name: 'Node.js', description: 'BLOG.CATEGORIES_SECTION.LIST.WEB2.ITEMS.NODE', articleCount: 0, slug: 'nodejs' },
      { id: 'tech-nest', icon: '🐈', name: 'NestJS', description: 'BLOG.CATEGORIES_SECTION.LIST.WEB2.ITEMS.NEST', articleCount: 0, slug: 'nestjs' },
      { id: 'tech-front', icon: '🎨', name: 'Frontend Tools', description: 'BLOG.CATEGORIES_SECTION.LIST.WEB2.ITEMS.FRONT_TOOLS', articleCount: 0, slug: 'frontend' }
    ]
  },
  {
    id: 'cat-cloud',
    title: 'BLOG.CATEGORIES_SECTION.LIST.CLOUD.TITLE',
    icon: '☁️',
    description: 'BLOG.CATEGORIES_SECTION.LIST.CLOUD.DESC',
    items: [
      { id: 'tech-aws', icon: '🟠', name: 'AWS Cloud', description: 'BLOG.CATEGORIES_SECTION.LIST.CLOUD.ITEMS.AWS', articleCount: 0, slug: 'aws' },
      { id: 'tech-docker', icon: '🐳', name: 'Docker', description: 'BLOG.CATEGORIES_SECTION.LIST.CLOUD.ITEMS.DOCKER', articleCount: 0, slug: 'docker' },
      { id: 'tech-cicd', icon: '🔄', name: 'CI/CD', description: 'BLOG.CATEGORIES_SECTION.LIST.CLOUD.ITEMS.CICD', articleCount: 0, slug: 'cicd' }
    ]
  },
  {
    id: 'cat-web3',
    title: 'BLOG.CATEGORIES_SECTION.LIST.WEB3.TITLE',
    icon: '⛓️',
    description: 'BLOG.CATEGORIES_SECTION.LIST.WEB3.DESC',
    items: [
      { id: 'tech-sol', icon: '💎', name: 'Solidity', description: 'BLOG.CATEGORIES_SECTION.LIST.WEB3.ITEMS.SOL', articleCount: 0, slug: 'solidity' },
      { id: 'tech-hard', icon: '⚡', name: 'Hardhat', description: 'BLOG.CATEGORIES_SECTION.LIST.WEB3.ITEMS.HARDHAT', articleCount: 0, slug: 'hardhat' },
      { id: 'tech-dapp', icon: '🦊', name: 'dApp Development', description: 'BLOG.CATEGORIES_SECTION.LIST.WEB3.ITEMS.DAPP', articleCount: 0, slug: 'dapp' }
    ]
  },
  {
    id: 'cat-test',
    title: 'BLOG.CATEGORIES_SECTION.LIST.QUALITY.TITLE',
    icon: '🧪',
    description: 'BLOG.CATEGORIES_SECTION.LIST.QUALITY.DESC',
    items: [
      { id: 'tech-jest', icon: '🃏', name: 'Jest', description: 'BLOG.CATEGORIES_SECTION.LIST.QUALITY.ITEMS.JEST', articleCount: 0, slug: 'jest' },
      { id: 'tech-ang-test', icon: '🔬', name: 'Angular Testing', description: 'BLOG.CATEGORIES_SECTION.LIST.QUALITY.ITEMS.ANG_TEST', articleCount: 0, slug: 'angular-testing' }
    ]
  }
];

