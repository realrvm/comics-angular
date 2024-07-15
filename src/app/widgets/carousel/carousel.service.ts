import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CarouselService {
  getImages() {
    return [
      { id: 1, path: '/images/second/1.jpg' },
      { id: 2, path: '/images/second/2.jpg' },
      { id: 3, path: '/images/second/3.jpg' },
      { id: 4, path: '/images/second/4.jpg' },
    ];
  }
}
