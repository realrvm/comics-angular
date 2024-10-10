import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http'
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core'
import { provideRouter } from '@angular/router'
import { environment } from '@env/environment'

import { routes } from './app.routes'
import { API_URL, errorHandlerInterceptor } from './core'

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withFetch(), withInterceptors([errorHandlerInterceptor])),
    {provide: API_URL, useValue: environment.api_url}
  ],
}
