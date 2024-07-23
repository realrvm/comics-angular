import { Component, inject, OnInit } from '@angular/core';
import { AppWidthService } from '@core/services/app-width.service';
import { PicturesComponent } from '@core/widgets/pictures/pictures.component';
import { SidebarComponent } from '@core/widgets/sidebar/sidebar.component';

@Component({
  selector: 'azra-content',
  standalone: true,
  imports: [SidebarComponent, PicturesComponent],
  templateUrl: './content.component.html',
  styleUrl: './content.component.scss',
})
export class ContentComponent implements OnInit {
  private appService = inject(AppWidthService);

  public isDesktop = this.appService.isDesktopWidth;

  ngOnInit(): void {
    this.appService.calcWindowWidth();
  }
}
