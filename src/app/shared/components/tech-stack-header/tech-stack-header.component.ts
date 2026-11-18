import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  NgZone,
  afterNextRender,
  inject,
  signal,
} from '@angular/core';
import { ViewportScroller } from '@angular/common';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { TranslocoModule, TranslocoService } from '@jsverse/transloco';
import { filter } from 'rxjs/operators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { HOME_ANCHORS } from '../../contants/profile-links.constant';

/**
 * Header AXIOM (sticky).
 * - Transparente no topo; vira glass ao rolar.
 * - Destaca a seção ativa da Home (IntersectionObserver).
 * - Menu colapsável no mobile; fecha ao navegar ou com Esc.
 * - Sem listener de scroll: IntersectionObserver (fora da NgZone) para o
 *   estado "rolado" e para a seção ativa; só sinais mudam o template.
 */
@Component({
  selector: 'tech-stack-header',
  standalone: true,
  imports: [TranslocoModule, RouterLink, RouterLinkActive],
  templateUrl: './tech-stack-header.component.html',
  styleUrl: './tech-stack-header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(document:keydown.escape)': 'closeMenu()',
  },
})
export class TechStackHeaderComponent {
  private readonly transloco = inject(TranslocoService);
  private readonly router = inject(Router);
  private readonly zone = inject(NgZone);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly anchors = HOME_ANCHORS;
  protected readonly scrolled = signal(false);
  protected readonly menuOpen = signal(false);
  protected readonly activeSection = signal<string | null>(null);

  private sectionObserver?: IntersectionObserver;

  constructor() {
    // Âncoras via router (anchorScrolling) ignoram scroll-margin: compensa a altura do header.
    inject(ViewportScroller).setOffset([0, 72]);

    afterNextRender(() => {
      this.watchScroll();
      this.observeSections();

      this.router.events
        .pipe(
          filter(event => event instanceof NavigationEnd),
          takeUntilDestroyed(this.destroyRef),
        )
        .subscribe(() => {
          this.closeMenu();
          // Espera a nova rota renderizar antes de procurar as seções.
          setTimeout(() => this.observeSections());
        });
    });

    this.destroyRef.onDestroy(() => this.sectionObserver?.disconnect());
  }

  protected get activeLang(): string {
    return this.transloco.getActiveLang();
  }

  protected toggleLanguage(): void {
    this.transloco.setActiveLang(this.activeLang === 'pt-br' ? 'en-us' : 'pt-br');
  }

  protected toggleMenu(): void {
    this.menuOpen.update(open => !open);
  }

  protected closeMenu(): void {
    this.menuOpen.set(false);
  }

  /**
   * Estado "rolado" sem listener de scroll: um sentinela de 24px no topo do
   * documento é observado por IntersectionObserver. Quando ele sai da tela,
   * o header vira vidro. Zero trabalho na main thread durante o scroll.
   */
  private watchScroll(): void {
    const sentinel = document.createElement('div');
    sentinel.setAttribute('aria-hidden', 'true');
    sentinel.style.cssText = 'position:absolute;top:0;left:0;width:1px;height:24px;pointer-events:none;visibility:hidden';
    document.body.prepend(sentinel);

    this.zone.runOutsideAngular(() => {
      const observer = new IntersectionObserver(([entry]) => {
        const next = !entry.isIntersecting;
        if (next !== this.scrolled()) this.zone.run(() => this.scrolled.set(next));
      });
      observer.observe(sentinel);

      this.destroyRef.onDestroy(() => {
        observer.disconnect();
        sentinel.remove();
      });
    });
  }

  private observeSections(): void {
    this.sectionObserver?.disconnect();
    this.activeSection.set(null);

    const sections = this.anchors
      .map(anchor => document.getElementById(anchor.id))
      .filter((el): el is HTMLElement => !!el);
    if (!sections.length) return;

    this.zone.runOutsideAngular(() => {
      this.sectionObserver = new IntersectionObserver(
        entries => {
          const visible = entries.find(entry => entry.isIntersecting);
          if (visible) this.zone.run(() => this.activeSection.set(visible.target.id));
        },
        // Linha de leitura no meio da tela.
        { rootMargin: '-45% 0px -50% 0px' },
      );
      sections.forEach(section => this.sectionObserver!.observe(section));
    });
  }
}
