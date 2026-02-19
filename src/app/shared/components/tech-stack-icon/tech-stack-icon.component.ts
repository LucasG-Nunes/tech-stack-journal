/* eslint-disable @angular-eslint/prefer-inject */
import { Component, Input, OnChanges, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'tech-stack-icon',
  standalone: true,
  templateUrl: './tech-stack-icon.component.html',
  styleUrls: ['./tech-stack-icon.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TechIconComponent implements OnChanges {
  @Input() svgRaw: string | SafeHtml = ''; 
  safeSvg?: SafeHtml;

  constructor(private sanitizer: DomSanitizer) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['svgRaw']) {
      const value = changes['svgRaw'].currentValue;
      
      if (value) {
        this.safeSvg = typeof value === 'string' 
          ? this.sanitizer.bypassSecurityTrustHtml(value) 
          : value;
      }
    }
  }
}