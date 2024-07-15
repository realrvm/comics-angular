import { Component, inject } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';
import { CarouselService } from './carousel.service';
import { Router } from '@angular/router';

@Component({
  selector: 'azra-carousel',
  standalone: true,
  imports: [CarouselModule],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss',
})
export class CarouselComponent {
  private carouselService = inject(CarouselService);
  private router = inject(Router);

  public images = this.carouselService.getImages();

  public goHome(): void {
    this.router.navigate(['']);
  }
}
