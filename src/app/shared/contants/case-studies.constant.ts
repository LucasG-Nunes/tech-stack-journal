import { CaseStudy } from '../../presentation/home/components/tech-stack-case-studies/tech-stack-case-study-card/tech-stack-case-study-card.component';

/**
 * Dossiês da Track Record, na ordem do bento grid (12 colunas):
 *   linha 1 → 12 (atual)  |  linha 2 → 7 + 5  |  linha 3 → 4 + 4 + 4
 * Métricas e stack extraídas dos DEEP_DIVE já publicados — nada inventado.
 */
export const CASE_STUDIES: CaseStudy[] = [
  {
    // Atuação atual. Sem logo no projeto: monograma.
    title: 'PROJECTS.ITEMS.SICREDI.TITLE',
    description: 'PROJECTS.ITEMS.SICREDI.DESC',
    monogram: 'SC',
    current: true,
    sector: 'FINANCE',
    classification: 'CRITICAL',
    stack: ['Kafka', 'Kubernetes', 'Kong', 'Microservices', 'Event-driven'],
    span: 12,
    accent: 'cyan',
  },
  {
    title: 'PROJECTS.ITEMS.CNJ_RPV.TITLE',
    description: 'PROJECTS.ITEMS.CNJ_RPV.DESC',
    imageUrl: 'assets/images/logos/logo-cnj-branca-2023.png',
    sector: 'JUDICIARY',
    classification: 'CRITICAL',
    stack: ['Angular 17+', 'Signals · RxJS', 'Java', 'Spring Boot'],
    span: 7,
    accent: 'cyan',
    metric: { value: 70, prefix: 'R$ ', suffix: ' bi', label: 'PROJECTS.METRICS.SISPREQ' },
  },
  {
    title: 'PROJECTS.ITEMS.CNJ_PJE.TITLE',
    description: 'PROJECTS.ITEMS.CNJ_PJE.DESC',
    imageUrl: 'assets/images/logos/logo-cnj-branca-2023.png',
    sector: 'JUDICIARY',
    classification: 'CRITICAL',
    stack: ['Angular', 'Signals', 'RxJS', 'Lighthouse'],
    span: 5,
    accent: 'purple',
  },
  {
    title: 'PROJECTS.ITEMS.RANDON.TITLE',
    description: 'PROJECTS.ITEMS.RANDON.DESC',
    imageUrl: 'assets/images/logos/banco-randon.jpg',
    sector: 'FINANCE',
    classification: 'CRITICAL',
    stack: ['Next.js', 'NestJS', 'BFF', 'Zod'],
    span: 4,
    accent: 'purple',
  },
  {
    title: 'PROJECTS.ITEMS.LAB.TITLE',
    description: 'PROJECTS.ITEMS.LAB.DESC',
    imageUrl: 'assets/images/logos/LM-engineer-logo.png',
    sector: 'RND',
    classification: 'LAB',
    stack: ['Angular 19', 'SSR', 'Cloudflare Edge', 'i18n'],
    span: 4,
    accent: 'cyan',
    metric: { value: 700, suffix: 'ms', label: 'PROJECTS.METRICS.LCP' },
  },
  {
    title: 'PROJECTS.ITEMS.BARBER.TITLE',
    description: 'PROJECTS.ITEMS.BARBER.DESC',
    imageUrl: 'assets/images/logos/LM-engineer-logo.png',
    sector: 'SAAS',
    classification: 'PRODUCT',
    stack: ['React Native', 'Expo', 'Node.js'],
    span: 4,
    accent: 'cyan',
  },
];
