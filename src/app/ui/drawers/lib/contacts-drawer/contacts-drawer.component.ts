import { Component } from '@angular/core'
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop'
import { SidebarModule } from 'primeng/sidebar'
import { tap } from 'rxjs'

import { DrawerService } from '@azra/core'
import { SpriteComponent } from '@azra/icons'

import { contactsDrawerContent } from '../drawers'

@Component({
  selector: 'azra-contacts-drawer',
  standalone: true,
  imports: [SidebarModule, SpriteComponent],
  templateUrl: './contacts-drawer.component.html',
})
export class ContactsDrawerComponent {
  public contactsDrawer!: boolean
  public readonly drawerContent = contactsDrawerContent

  constructor(private drawerService: DrawerService) {
    toObservable(this.drawerService.contactsDrawerVisibility)
      .pipe(
        tap((val) => (this.contactsDrawer = val)),
        takeUntilDestroyed(),
      )
      .subscribe()
  }

  public onClose(): void {
    this.drawerService.setContactsDrawerVisibility(false)
  }
}
