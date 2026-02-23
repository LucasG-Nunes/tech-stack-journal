/* eslint-disable @angular-eslint/directive-selector */

import { Directive, ElementRef, HostListener, inject, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[customTooltip]',
  standalone: true
})
export class TooltipDirective {
  @Input('customTooltip') tooltipText = '';
  private tooltipElement: HTMLElement | null = null;

  private element = inject( ElementRef);
  private renderer = inject(Renderer2)

  @HostListener('mouseenter') onMouseEnter() {
    if (!this.tooltipText) return;
    this.createTooltip();
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.removeTooltip();
  }

private createTooltip() {
  this.tooltipElement = this.renderer.createElement('span');
  this.renderer.appendChild(this.tooltipElement, this.renderer.createText(this.tooltipText));
  this.renderer.addClass(this.tooltipElement, 'glass-tooltip');
  
  this.renderer.appendChild(document.body, this.tooltipElement);

  const hostPos = this.element.nativeElement.getBoundingClientRect();
  const tooltipPos = this.tooltipElement?.getBoundingClientRect();
  
  const scrollY = window.scrollY;
  const padding = 10; 

  let top = hostPos.top - (tooltipPos?.height ?? 0)- padding;
  
  if (top < 0) { 
    top = hostPos.bottom + padding;
    this.renderer.addClass(this.tooltipElement, 'tooltip-bottom');
  } else {
    this.renderer.addClass(this.tooltipElement, 'tooltip-top');
  }

  const left = hostPos.left + (hostPos.width / 2);

  this.renderer.setStyle(this.tooltipElement, 'top', `${top + scrollY}px`);
  this.renderer.setStyle(this.tooltipElement, 'left', `${left}px`);
}

  private removeTooltip() {
    if (this.tooltipElement) {
      this.renderer.removeChild(document.body, this.tooltipElement);
      this.tooltipElement = null;
    }
  }
}