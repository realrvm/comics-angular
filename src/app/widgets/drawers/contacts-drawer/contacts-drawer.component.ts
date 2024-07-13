import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SvgIconComponent } from '@shared/svg-icon/svg-icon.component';
import { SidebarModule } from 'primeng/sidebar';
import { tap } from 'rxjs';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'azra-contacts-drawer',
  standalone: true,
  imports: [SidebarModule, SvgIconComponent],
  templateUrl: './contacts-drawer.component.html',
  styleUrl: './contacts-drawer.component.scss',
})
export class ContactsDrawerComponent implements OnInit {
  private appService = inject(AppService);
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
