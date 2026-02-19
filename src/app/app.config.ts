import { ApplicationConfig, provideZoneChangeDetection, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideTransloco } from '@jsverse/transloco';
import { provideTranslocoPersistLang } from '@jsverse/transloco-persist-lang';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { routes } from './app.routes';
import { TranslocoHttpLoader } from './core/services/transloco/transloco-loader.service';
import { ssrSafeLocalStorage } from './core/utils/ser-safe-storage';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withFetch()),

    provideTransloco({
      config: {
        availableLangs: ['pt-br', 'en-us'],
        defaultLang: 'pt-br',
        reRenderOnLangChange: true,
        prodMode: !isDevMode(),
      },
      loader: TranslocoHttpLoader,
    }),

    provideTranslocoPersistLang({
      storage: {
        useFactory: () => {
          // Guard SSR: no servidor não existe localStorage
          ssrSafeLocalStorage();
          // Fallback in-memory para o contexto Node
          return {
            getItem: () => null,
            setItem: () => {},
            removeItem: () => {},
            clear: () => {},
            length: 0,
            key: () => null,
          } as Storage;
        },
      },
    }),

    provideClientHydration(withEventReplay()),
  ],
};
