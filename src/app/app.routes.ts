import { Routes } from '@angular/router';
import { ContentComponent } from '@pages/content/content.component';
import { MainComponent } from '@pages/main/main.component';
import { NotFoundComponent } from '@pages/not-found/not-found.component';
import { CarouselComponent } from '@widgets/carousel/carousel.component';

export const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'content', component: ContentComponent },
  { path: 'chapter/:id', component: CarouselComponent },
  { path: '**', component: NotFoundComponent },
];
