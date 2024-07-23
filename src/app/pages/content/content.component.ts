import { Component, inject } from '@angular/core';
import { AppWidthService } from '@core/services/app-width.service';
import { DESKTOP_BREAKPOINT } from '@core/shared/constants';
import { PicturesComponent } from '@core/widgets/pictures/pictures.component';
import { SidebarComponent } from '@core/widgets/sidebar/sidebar.component';

@Component({
  selector: 'azra-content',
  standalone: true,
  imports: [SidebarComponent, PicturesComponent],
  templateUrl: './content.component.html',
  styleUrl: './content.component.scss',
})
export class ContentComponent {
  private appService = inject(AppWidthService);

  public width = this.appService.width;
  public DESKTOP_BREAKPOINT = DESKTOP_BREAKPOINT;
}
