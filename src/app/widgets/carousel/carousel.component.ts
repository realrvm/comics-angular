import { Component, inject, OnInit } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';
import { CarouselService } from './carousel.service';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'azra-carousel',
  standalone: true,
  imports: [CarouselModule],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss',
})
export class CarouselComponent implements OnInit{
  private carouselService = inject(CarouselService);
  private appService = inject(AppService);
  private router = inject(Router);

  public isDesktop = this.appService.isDesktopWidth;
  public images = this.carouselService.getImages();

  public goHome(): void {
    this.router.navigate(['']);
  }

  ngOnInit(): void {
    this.appService.calcWindowWidth();
  }
}
