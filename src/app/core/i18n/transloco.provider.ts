import { isDevMode } from '@angular/core';
import { provideTransloco } from '@jsverse/transloco';
import { TranslocoHttpLoader } from '../services/transloco/transloco-loader.service';

export const provideTranslocoConfig = () =>
  provideTransloco({
    config: {
      availableLangs: ['pt-br', 'en-us'],
      defaultLang: 'pt-br',
      reRenderOnLangChange: true,
      prodMode: !isDevMode(),
      missingHandler: {
        logMissingKey: false,
        useFallbackTranslation: true,
        allowEmpty: true,
      },
    },
    loader: TranslocoHttpLoader,
  });
