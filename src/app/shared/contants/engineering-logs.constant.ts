/**
 * Logs de engenharia (artigos do blog).
 *
 * Fonte única para a seção 06 da Home e para a rota /blog.
 * Todos ainda estão EM REDAÇÃO: sem data nem tempo de leitura até serem
 * publicados (nada de números inventados). Ao publicar um log, preencha
 * `status: 'PUBLISHED'`, `date` (AAAA-MM-DD) e `readTime` (minutos).
 *
 * Textos em LOGS.ITEMS.<id>.TITLE / .DESC no i18n.
 */
export type LogTrack = 'AI' | 'ARCH' | 'SEC' | 'FRONT';
export type LogStatus = 'DRAFT' | 'PUBLISHED';

export interface EngineeringLog {
  /** Chave em LOGS.ITEMS. */
  id: string;
  slug: string;
  track: LogTrack;
  status: LogStatus;
  /** Termos técnicos (neutros de idioma). */
  tags: string[];
  featured?: boolean;
  date?: string;
  readTime?: number;
}

/** Trilhas na ordem de exibição; textos em LOGS.TRACKS.<key>. */
export const LOG_TRACKS: LogTrack[] = ['AI', 'ARCH', 'SEC', 'FRONT'];

export const ENGINEERING_LOGS: EngineeringLog[] = [
  // --- IA & LLMs (pós-graduação em andamento) ---
  { id: 'RAG', slug: 'rag-na-pratica', track: 'AI', status: 'DRAFT', featured: true, tags: ['RAG', 'Embeddings', 'LLMs'] },
  { id: 'AI_BANK', slug: 'llm-em-sistema-critico', track: 'AI', status: 'DRAFT', tags: ['LLMs', 'Governança', 'Fintech'] },
  { id: 'EVALS', slug: 'evals-antes-de-prompts', track: 'AI', status: 'DRAFT', tags: ['Evals', 'LLMOps'] },
  { id: 'POSTGRAD', slug: 'diario-da-pos-ia', track: 'AI', status: 'DRAFT', tags: ['IA Generativa', 'Transformers'] },

  // --- Arquitetura & eventos (dia a dia no Sicredi) ---
  { id: 'KAFKA', slug: 'eventos-no-consignado', track: 'ARCH', status: 'DRAFT', tags: ['Kafka', 'Event-driven'] },
  { id: 'KONG', slug: 'do-endpoint-a-tela-kong', track: 'ARCH', status: 'DRAFT', tags: ['Kong', 'API Gateway'] },
  { id: 'K8S', slug: 'kubernetes-para-dev-de-produto', track: 'ARCH', status: 'DRAFT', tags: ['Kubernetes', 'Observabilidade'] },

  // --- Segurança ---
  { id: 'THM', slug: 'pensando-como-atacante', track: 'SEC', status: 'DRAFT', tags: ['TryHackMe', 'AppSec'] },

  // --- Front-end ---
  { id: 'GSAP', slug: 'animacoes-angular-gsap-ssr', track: 'FRONT', status: 'DRAFT', tags: ['Angular', 'GSAP', 'SSR'] },
];
