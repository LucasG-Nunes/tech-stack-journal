/**
 * AXIOM motion tokens — espelho TS de src/styles/_axiom-tokens.scss.
 * Toda animação GSAP deve consumir daqui para manter ritmo consistente.
 */
export const AX_EASE = {
  out: 'expo.out',
  inOut: 'power3.inOut',
  soft: 'power2.out',
} as const;

export const AX_DURATION = {
  fast: 0.3,
  base: 0.8,
  slow: 1.2,
  scramble: 1.4,
  ticker: 2,
} as const;

export const AX_STAGGER = {
  tight: 0.06,
  base: 0.12,
  loose: 0.2,
} as const;

/** Glifos usados no efeito de decodificação. */
export const AX_SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!<>-_\\/[]{}=+*^?#';
