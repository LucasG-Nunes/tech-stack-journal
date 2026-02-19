import { Article } from "../components/tech-stack-article-card/tech-stack-article-card.component";

export const RECENT_ARTICLES: Article[] = [
  {
    id: '1',
    slug: 'standalone-components-no-angular-17-o-futuro-do-angular',
    title: 'BLOG.ARTICLES.STANDALONE.TITLE',
    description: 'BLOG.ARTICLES.STANDALONE.DESC',
    category: 'Angular',
    date: '2024-12-15', 
    readTime: '5',
    views: '234',
    isFeatured: true 
  },
  {
    id: '2',
    slug: 'integrando-metamask-em-aplicacoes-react',
    title: 'BLOG.ARTICLES.METAMASK.TITLE',
    description: 'BLOG.ARTICLES.METAMASK.DESC',
    category: 'Web3',
    date: '2024-12-12',
    readTime: '8',
    views: '189'
  },
  {
    id: '3',
    slug: 'deploy-automatico-com-aws-lambda-e-api-gateway',
    title: 'BLOG.ARTICLES.AWS_DEPLOY.TITLE',
    description: 'BLOG.ARTICLES.AWS_DEPLOY.DESC',
    category: 'AWS',
    date: '2024-12-10',
    readTime: '7',
    views: '156'
  },
  {
    id: '4',
    slug: 'advanced-typescript-conditional-types-e-utility-types',
    title: 'BLOG.ARTICLES.TS_ADVANCED.TITLE',
    description: 'BLOG.ARTICLES.TS_ADVANCED.DESC',
    category: 'TypeScript',
    date: '2024-12-08',
    readTime: '6',
    views: '298'
  }
];