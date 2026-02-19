/* eslint-disable @angular-eslint/directive-selector */
import { Directive, ElementRef, Renderer2, OnInit, OnDestroy, Input, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Directive({
  selector: '[appScrollReveal]',
  standalone: true
})
export class ScrollRevealDirective implements OnInit, OnDestroy {
  private el = inject(ElementRef);
  private renderer = inject(Renderer2);
  private platformId = inject(PLATFORM_ID);

  private observer: IntersectionObserver | null = null;

  @Input() delay: number | string = 0;

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    this.renderer.addClass(this.el.nativeElement, 'reveal-hidden');

    const delayMs = typeof this.delay === 'string' ? parseInt(this.delay, 10) : this.delay;
    if (delayMs > 0) {
      this.renderer.setStyle(this.el.nativeElement, 'transition-delay', `${delayMs}ms`);
    }

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.renderer.addClass(this.el.nativeElement, 'reveal-visible');
        } else {
          this.renderer.removeClass(this.el.nativeElement, 'reveal-visible');
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -80px 0px'
    });

    this.observer.observe(this.el.nativeElement);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}