import { Component, inject} from '@angular/core';
import { Router } from '@angular/router';
import { AppWidthService } from '@core/services/app-width.service';
import { DESKTOP_BREAKPOINT } from '@core/shared/constants';
import { SvgIconComponent } from '@core/shared/svg-icon/svg-icon.component';

@Component({
  selector: 'azra-sidebar',
  standalone: true,
  imports: [SvgIconComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  private router = inject(Router);
  private appService = inject(AppWidthService);
  public width = this.appService.width;
  public DESKTOP_BREAKPOINT = DESKTOP_BREAKPOINT;

  public goHome() {
    this.router.navigate(['']);
  }

  public goChapterOne() {
    this.router.navigate(['']);
  }
}
