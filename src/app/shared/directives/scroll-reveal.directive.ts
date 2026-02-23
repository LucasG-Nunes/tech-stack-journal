/* eslint-disable @angular-eslint/directive-selector */
import { Directive, ElementRef, Renderer2, OnInit, OnDestroy, Input, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Directive({
  selector: '[appScrollReveal]',
  standalone: true,
})
export class ScrollRevealDirective implements OnInit, OnDestroy {
  private element = inject(ElementRef);
  private renderer = inject(Renderer2);
  private platformId = inject(PLATFORM_ID);

  private observer: IntersectionObserver | null = null;

  @Input() delay: number | string = 0;

  public ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    this.handleHiddenViewEffect()
  }

  public ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  private handleHiddenViewEffect(): void {
    const { nativeElement } = this.element;
    this.renderer.addClass(nativeElement, 'reveal-hidden');

    const delayMs = typeof this.delay === 'string' ? parseInt(this.delay, 10) : this.delay;

    if (delayMs > 0) {
      this.renderer.setStyle(nativeElement, 'transition-delay', `${delayMs}ms`);
    }

    this.observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          entry.isIntersecting
            ? this.renderer.addClass(nativeElement, 'reveal-visible')
            : this.renderer.removeClass(nativeElement, 'reveal-visible');
        });
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -80px 0px',
      }
    );

    this.observer.observe(nativeElement);
  }
}
