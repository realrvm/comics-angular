import { Component, inject, OnInit } from '@angular/core';
import { PicturesComponent } from '@widgets/pictures/pictures.component';
import { SidebarComponent } from '@widgets/sidebar/sidebar.component';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'azra-content',
  standalone: true,
  imports: [SidebarComponent, PicturesComponent],
  templateUrl: './content.component.html',
  styleUrl: './content.component.scss',
})
export class ContentComponent implements OnInit {
  private appService = inject(AppService);

  public isDesktop = this.appService.isDesktopWidth;

  ngOnInit(): void {
    this.appService.calcWindowWidth();
  }
}
