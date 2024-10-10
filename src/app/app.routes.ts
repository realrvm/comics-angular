import { Routes } from '@angular/router'

import { PATHS } from '@azra/core'
import { HomeComponent } from '@azra/pages'

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: PATHS.home,
    component: HomeComponent,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('@azra/ui/layout').then((m) => m.LayoutComponent),
      },
      {
        path: '',
        loadComponent: () =>
          import('@azra/ui/layout').then((m) => m.HeaderComponent),
        outlet: 'header',
      },
    ],
  },
  {
    path: PATHS.content,
    title: 'Azra Content',
    loadComponent: () => import('@azra/pages').then((m) => m.ContentComponent),
  },
  {
    path: '**',
    title: 'Azra Not Found',
    loadComponent: () => import('@azra/pages').then((m) => m.NotFoundComponent),
  },
]
