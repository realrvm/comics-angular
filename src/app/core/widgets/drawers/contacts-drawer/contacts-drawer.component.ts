import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
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
export class ContactsDrawerComponent implements OnInit {
  private appService = inject(AppWidthService);
  private destroyRef = inject(DestroyRef);

  public contactsDrawer!: boolean;

  public onClose(): void {
    this.appService.setContactsDrawerVisible(false);
  }

  ngOnInit(): void {
    this.appService.contactsDrawerVisible$
      .pipe(
        tap((val) => (this.contactsDrawer = val)),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe();
  }
}
