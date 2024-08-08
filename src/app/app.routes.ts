import { Routes } from '@angular/router';
import { widthGuard } from '@core/guards/width.quard';
import { ContentComponent } from '@pages/content/content.component';
import { MainComponent } from '@pages/main/main.component';

export const routes: Routes = [
  { path: '', component: MainComponent },
  {
    path: 'content',
    loadComponent: () =>
      import('./pages/content/content.component').then(
        (c) => c.ContentComponent,
      ),
  },
  {
    path: 'content-mobile',
    loadComponent: () =>
      import('./pages/content-mobile/content-mobile.component').then(
        (c) => c.ContentMobileComponent,
      ),
    canActivate: [widthGuard],
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
