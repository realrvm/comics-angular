import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { PicturesMobileComponent } from '@core/widgets/pictures-mobile/pictures-mobile.component';

@Component({
  selector: 'azra-content-mobile',
  standalone: true,
  imports: [PicturesMobileComponent],
  templateUrl: './content-mobile.component.html',
  styleUrl: './content-mobile.component.scss',
})
export class ContentMobileComponent {
  private readonly router = inject(Router);

  public goHome() {
    this.router.navigate(['']);
  }
}
