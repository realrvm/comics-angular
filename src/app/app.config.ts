import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http'
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core'
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'
import { provideRouter } from '@angular/router'
import { environment } from '@env/environment'
import { providePrimeNG } from 'primeng/config'

import { preset } from './app.preset'
import { routes } from './app.routes'
import { API_URL, errorHandlerInterceptor } from './core'

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset,
        options: {
          cssLayer: {
            name: 'primeng',
            order: 'tailwind-base, primeng, tailwind-utilities',
          },
        },
      },
    }),
    provideHttpClient(withFetch(), withInterceptors([errorHandlerInterceptor])),
    { provide: API_URL, useValue: environment.api_url },
  ],
}
