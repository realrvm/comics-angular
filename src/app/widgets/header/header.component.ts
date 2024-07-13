import { Component, inject, OnInit } from '@angular/core';
import { SvgIconComponent } from '@shared/svg-icon/svg-icon.component';
import { MenuComponent } from '@widgets/menu/menu.component';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'azra-header',
  standalone: true,
  imports: [SvgIconComponent, MenuComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  private appService = inject(AppService);

  public isDesktopWidth = this.appService.isDesktopWidth;

  ngOnInit(): void {
    this.appService.calcWindowWidth();
  }
}
