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
      {
        path: '',
        loadComponent: () =>
          import('@azra/ui/drawers').then((m) => m.AboutDrawerComponent),
        outlet: 'about-drawer',
      },
      {
        path: '',
        loadComponent: () =>
          import('@azra/ui/drawers').then((m) => m.ContactsDrawerComponent),
        outlet: 'contacts-drawer',
      },
    ],
  },
  {
    path: PATHS.content,
    title: 'TBOA',
    loadComponent: () => import('@azra/pages').then((m) => m.ContentComponent),
  },
  {
    path: PATHS.contentHandset,
    title: 'TBOA',
    loadComponent: () =>
      import('@azra/pages').then((m) => m.ContentHandsetComponent),
  },
  {
    path: '**',
    title: 'Azra Not Found',
    loadComponent: () => import('@azra/pages').then((m) => m.NotFoundComponent),
  },
]
