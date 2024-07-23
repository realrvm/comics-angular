import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
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
  public isAboutActive = toSignal(this.appService.aboutDrawerVisible$);
  public isContactsActive = toSignal(this.appService.contactsDrawerVisible$);

  public setContactsDrawerVisible(): void {
    this.appService.setContactsDrawerVisible(true);
  }

  public setAboutDrawerVisible(): void {
    this.appService.setAboutDrawerVisible(true);
  }
}
