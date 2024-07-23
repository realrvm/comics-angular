import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AppWidthService } from '@core/services/app-width.service';

@Component({
  selector: 'azra-menu',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
})
export class MenuComponent {
  private appService = inject(AppWidthService);
  public isAboutActive = this.appService.aboutDrawerVisibility;
  public isContactsActive = this.appService.contactsDrawerVisibility;

  public setContactsDrawerVisible(): void {
    this.appService.setContactsDrawerVisibility(true);
  }

  public setAboutDrawerVisible(): void {
    this.appService.setAboutDrawerVisibility(true);
  }
}
