import { Component} from '@angular/core';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { AppWidthService } from '@core/services/app-width.service';
import { SvgIconComponent } from '@core/shared/svg-icon/svg-icon.component';
import { SidebarModule } from 'primeng/sidebar';
import { tap } from 'rxjs';

@Component({
  selector: 'azra-about-drawer',
  standalone: true,
  imports: [SidebarModule, SvgIconComponent],
  templateUrl: './about-drawer.component.html',
  styleUrl: './about-drawer.component.scss',
})
export class AboutDrawerComponent {
  public aboutDrawer!: boolean;

  public onClose(): void {
    this.appService.setAboutDrawerVisibility(false);
  }

  constructor(private appService: AppWidthService) {
    toObservable(this.appService.aboutDrawerVisibility)
      .pipe(
        tap((val) => (this.aboutDrawer = val)),
        takeUntilDestroyed(),
      )
      .subscribe();
  }
}
