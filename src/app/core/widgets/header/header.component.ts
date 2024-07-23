import { Component, inject, OnInit } from '@angular/core';
import { AppWidthService } from '@core/services/app-width.service';
import { SvgIconComponent } from '@core/shared/svg-icon/svg-icon.component';
import { MenuComponent } from '@core/widgets/menu/menu.component';

@Component({
  selector: 'azra-header',
  standalone: true,
  imports: [SvgIconComponent, MenuComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  private appService = inject(AppWidthService);

  public isDesktopWidth = this.appService.isDesktopWidth;

  ngOnInit(): void {
    this.appService.calcWindowWidth();
  }
}
