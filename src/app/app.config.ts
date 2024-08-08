import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideTransloco } from '@jsverse/transloco';
import { TranslocoHttpLoader } from './transloco-loader';
import { provideHttpClient } from '@angular/common/http';
import { provideIcons } from '@libs/svg-icon';
import { provideToast } from '@libs/toast';
import { provideAnimations } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideAnimations(),
    provideRouter(routes),
    provideHttpClient(),
    provideIcons(),
    provideToast(),
    provideTransloco({
      config: {
        availableLangs: ['vn', 'en'],
        defaultLang: 'vn',
        // Remove this option if your application doesn't support changing language in runtime.
        reRenderOnLangChange: true,
      },
      loader: TranslocoHttpLoader
    })
  ]
};
