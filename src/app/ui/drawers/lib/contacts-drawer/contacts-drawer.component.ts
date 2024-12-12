import { Component, inject } from '@angular/core'
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop'
import { SidebarModule } from 'primeng/sidebar'
import { shareReplay, tap } from 'rxjs'

import { DrawerService } from '@azra/core'
import { SpriteComponent } from '@azra/icons'

import { ContactsDrawerService } from './contacts-drawer.service'

@Component({
  selector: 'azra-contacts-drawer',
  standalone: true,
  imports: [SidebarModule, SpriteComponent],
  templateUrl: './contacts-drawer.component.html',
  styles: `
    :host {
      ::ng-deep .p-sidebar-right.p-sidebar {
        @apply overflow-y-auto;
      }
    }
  `,
})
export class ContactsDrawerComponent {
  public contactsDrawer!: boolean
  private readonly contactsService = inject(ContactsDrawerService)

  constructor(private drawerService: DrawerService) {
    toObservable(this.drawerService.contactsDrawerVisibility)
      .pipe(
        tap((val) => (this.contactsDrawer = val)),
        shareReplay(1),
        takeUntilDestroyed(),
      )
      .subscribe()
  }

  public onClose(): void {
    this.drawerService.setContactsDrawerVisibility(false)
  }

  public readonly contactsData = this.contactsService.contactsDataResult
  public readonly contactsError = this.contactsService.contactsDataError
}
