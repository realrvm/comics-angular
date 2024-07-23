import { Component } from '@angular/core';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { AppWidthService } from '@core/services/app-width.service';
import { SvgIconComponent } from '@core/shared/svg-icon/svg-icon.component';
import { SidebarModule } from 'primeng/sidebar';
import { tap } from 'rxjs';

@Component({
  selector: 'azra-contacts-drawer',
  standalone: true,
  imports: [SidebarModule, SvgIconComponent],
  templateUrl: './contacts-drawer.component.html',
  styleUrl: './contacts-drawer.component.scss',
})
export class ContactsDrawerComponent {
  public contactsDrawer!: boolean;

  public onClose(): void {
    this.appService.setContactsDrawerVisibility(false);
  }

  constructor(private appService: AppWidthService) {
    toObservable(this.appService.contactsDrawerVisibility)
      .pipe(
        tap((val) => (this.contactsDrawer = val)),
        takeUntilDestroyed(),
      )
      .subscribe();
  }
}
