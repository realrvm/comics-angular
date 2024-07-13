import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SvgIconComponent } from '@shared/svg-icon/svg-icon.component';
import { SidebarModule } from 'primeng/sidebar';
import { tap } from 'rxjs';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'azra-about-drawer',
  standalone: true,
  imports: [SidebarModule, SvgIconComponent],
  templateUrl: './about-drawer.component.html',
  styleUrl: './about-drawer.component.scss',
})
export class AboutDrawerComponent implements OnInit {
  private appService = inject(AppService);
  private destroyRef = inject(DestroyRef);

  public aboutDrawer!: boolean;

  public onClose(): void {
    this.appService.setAboutDrawerVisible(false)
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
