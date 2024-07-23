import { Component, inject } from '@angular/core';
import { AppWidthService } from '@core/services/app-width.service';
import { DESKTOP_BREAKPOINT } from '@core/shared/constants';
import { SvgIconComponent } from '@core/shared/svg-icon/svg-icon.component';
import { MenuComponent } from '@core/widgets/menu/menu.component';

@Component({
  selector: 'azra-header',
  standalone: true,
  imports: [SvgIconComponent, MenuComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  private appService = inject(AppWidthService);
  public DESKTOP_BREAKPOINT = DESKTOP_BREAKPOINT

  public width = this.appService.width;
}
