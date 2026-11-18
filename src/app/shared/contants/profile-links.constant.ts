/**
 * Fonte única dos contatos públicos do site (header, footer, contato).
 */
export const PROFILE_LINKS = {
  linkedin: 'https://www.linkedin.com/in/lucas-gnunes',
  github: 'https://github.com/LucasG-Nunes',
  whatsapp: 'https://wa.me/5581994532077?text=Ol%C3%A1%2C%20vim%20pelo%20seu%20site!',
  email: 'lucasgnam12@gmail.com',
  resume: 'assets/docs/Lucas_Nunes_international_resume.docx',
} as const;

/** Âncoras da Home usadas na navegação (ids nos hosts das seções). */
export const HOME_ANCHORS = [
  { id: 'manifesto', label: 'NAV.MANIFESTO' },
  { id: 'arsenal', label: 'NAV.ARSENAL' },
  { id: 'track-record', label: 'NAV.TRACK_RECORD' },
  { id: 'security', label: 'NAV.SECURITY' },
  { id: 'logs', label: 'NAV.LOGS' },
] as const;
