import { Injectable, NgZone, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import type { gsap as GsapCore } from 'gsap';
import type { ScrollTrigger as ScrollTriggerClass } from 'gsap/ScrollTrigger';

export type Gsap = typeof GsapCore;
export type ScrollTriggerStatic = typeof ScrollTriggerClass;
export type ScrollTriggerInstance = ScrollTriggerClass;

/** O que o GsapService entrega depois de carregar. */
export interface MotionKit {
  gsap: Gsap;
  ScrollTrigger: ScrollTriggerStatic;
}

/**
 * Ponto único de acesso ao GSAP.
 *
 * - Carrega gsap + plugins via import dinâmico, só no browser (fora do bundle SSR
 *   e do bundle inicial). Os imports `type` acima são apagados na compilação.
 * - Registra ScrambleText e ScrollTrigger uma única vez.
 * - Expõe helpers de reduced-motion / pointer e de execução fora da zona do
 *   Angular, para que cada frame de animação não dispare change detection.
 */
@Injectable({ providedIn: 'root' })
export class GsapService {
  private readonly zone = inject(NgZone);
  readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  private loader?: Promise<MotionKit>;

  /** Resolve o kit com plugins registrados. Rejeita no servidor. */
  load(): Promise<MotionKit> {
    if (!this.isBrowser) {
      return Promise.reject(new Error('GSAP is browser-only'));
    }

    this.loader ??= this.zone.runOutsideAngular(async () => {
      const [{ gsap }, { ScrambleTextPlugin }, { ScrollTrigger }] = await Promise.all([
        import('gsap'),
        import('gsap/ScrambleTextPlugin'),
        import('gsap/ScrollTrigger'),
      ]);
      gsap.registerPlugin(ScrambleTextPlugin, ScrollTrigger);
      return { gsap, ScrollTrigger };
    });

    return this.loader;
  }

  /** true quando o usuário pediu menos movimento no SO. */
  prefersReducedMotion(): boolean {
    return this.isBrowser && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  /** true em dispositivos com mouse de precisão (habilita tilt/hover pesados). */
  hasFinePointer(): boolean {
    return this.isBrowser && window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  }

  /** Executa fora da NgZone. */
  outside<T>(fn: () => T): T {
    return this.zone.runOutsideAngular(fn);
  }
}
