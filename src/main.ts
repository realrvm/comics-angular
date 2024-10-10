import { enableProdMode } from '@angular/core'
import { bootstrapApplication } from '@angular/platform-browser'
import { environment } from '@env/environment'

import { AppComponent } from './app/app.component'
import { config } from './app/app.config.browser'

if (environment.production) {
  enableProdMode()
}

bootstrapApplication(AppComponent, config).catch((err) => console.error(err))
