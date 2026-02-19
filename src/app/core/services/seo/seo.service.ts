import { inject, Injectable, PLATFORM_ID } from "@angular/core";
import { isPlatformBrowser } from "@angular/common";
import { Meta, Title } from "@angular/platform-browser";
import { DOCUMENT } from "@angular/common";
import { Router, NavigationEnd } from "@angular/router";
import { TranslocoService } from "@jsverse/transloco";
import { filter } from "rxjs/operators";
import { environment } from "../../../../environments/environment";


interface IConfigMetaTag{ title?: string, description?: string, keywords?: string, ogImage?: string }

@Injectable({ providedIn: 'root' })
export class SeoService {
  private titleService = inject(Title);
  private metaService = inject(Meta);
  private translocoService = inject(TranslocoService);
  private document = inject(DOCUMENT);
  private router = inject(Router);
  private platformId = inject(PLATFORM_ID);

public init(): void {
    this.translocoService.selectTranslation().subscribe(() => {
      this.updateMetaTags();
      this.updateLang();
    });

    if (isPlatformBrowser(this.platformId)) {
      this.router.events.pipe(
        filter(e => e instanceof NavigationEnd)
      ).subscribe((e) => {
        const url = `${environment.baseUrl}${(e as NavigationEnd).urlAfterRedirects}`;
        this.updateCanonical(url);
        this.metaService.updateTag({ property: 'og:url', content: url });
        this.metaService.updateTag({ name: 'twitter:url', content: url });
      });
    }
  }

public updateMetaTags(config?:IConfigMetaTag): void {
  const title = config?.title ?? this.translocoService.translate('SEO.TITLE') ?? "";
  const description = config?.description ?? this.translocoService.translate('SEO.DESCRIPTION') ?? "";
  const keywords = config?.keywords ?? this.translocoService.translate('SEO.KEYWORDS') ?? "";
  
  const image = config?.ogImage ?? `${environment.baseUrl}/assets/images/og-img.png`;

  this.titleService.setTitle(title);
  
  this.metaService.updateTag({ name: 'description', content: description });
  this.metaService.updateTag({ name: 'keywords', content: keywords });
  
  this.metaService.updateTag({ property: 'og:title', content: title });
  this.metaService.updateTag({ property: 'og:description', content: description });
  this.metaService.updateTag({ property: 'og:image', content: image });

  this.metaService.updateTag({ name: 'twitter:title', content: title });
  this.metaService.updateTag({ name: 'twitter:description', content: description });
  this.metaService.updateTag({ name: 'twitter:image', content: image });
}

  private updateLang(): void {
    if (isPlatformBrowser(this.platformId)) {
      const lang = this.translocoService.getActiveLang();
      this.document.documentElement.setAttribute(
        'lang',
        lang === 'pt-br' ? 'pt-BR' : 'en-US'
      );
    }
  }

  private updateCanonical(url: string): void {
    let link = this.document.querySelector("link[rel='canonical']") as HTMLLinkElement;
    if (!link) {
      link = this.document.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.document.head.appendChild(link);
    }
    link.setAttribute('href', url);
  }
}