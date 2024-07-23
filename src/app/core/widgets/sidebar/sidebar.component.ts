import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppWidthService } from '@core/services/app-width.service';
import { SvgIconComponent } from '@core/shared/svg-icon/svg-icon.component';

@Component({
  selector: 'azra-sidebar',
  standalone: true,
  imports: [SvgIconComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent implements OnInit {
  private router = inject(Router);
  private appService = inject(AppWidthService);

  public isDesktop = this.appService.isDesktopWidth;

  public goHome() {
    this.router.navigate(['']);
  }

  public goChapterOne() {
    this.router.navigate(['']);
  }

  ngOnInit(): void {
    this.appService.calcWindowWidth();
  }
}
