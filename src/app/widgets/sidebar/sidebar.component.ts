import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SvgIconComponent } from '@shared/svg-icon/svg-icon.component';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'azra-sidebar',
  standalone: true,
  imports: [SvgIconComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent implements OnInit {
  private router = inject(Router);
  private appService = inject(AppService);

  public isDesktop = this.appService.isDesktopWidth;

  public goHome() {
    this.router.navigate(['']);
  }

  public goChapterOne() {
    this.router.navigate(['/chapter/1']);
  }

  ngOnInit(): void {
    this.appService.calcWindowWidth();
  }
}
