import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
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
export class AboutDrawerComponent implements OnInit {
  private appService = inject(AppWidthService);
  private destroyRef = inject(DestroyRef);

  public aboutDrawer!: boolean;

  public onClose(): void {
    this.appService.setAboutDrawerVisible(false);
  }

  ngOnInit(): void {
    this.appService.aboutDrawerVisible$
      .pipe(
        tap((val) => (this.aboutDrawer = val)),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe();
  }
}
