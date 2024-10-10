import { Component } from '@angular/core'
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop'
import { SidebarModule } from 'primeng/sidebar'
import { tap } from 'rxjs'

import { DrawerService } from '@azra/core'
import { SpriteComponent } from '@azra/icons'

import { aboutDrawerContent } from '../drawers'

@Component({
  selector: 'azra-about-drawer',
  standalone: true,
  imports: [SidebarModule, SpriteComponent],
  templateUrl: './about-drawer.component.html',
})
export class AboutDrawerComponent {
  public aboutDrawer!: boolean
  public drawerContent = aboutDrawerContent

  constructor(private drawerService: DrawerService) {
    toObservable(this.drawerService.aboutDrawerVisibility)
      .pipe(
        tap((val) => (this.aboutDrawer = val)),
        takeUntilDestroyed(),
      )
      .subscribe()
  }

  public onClose(): void {
    this.drawerService.setAboutDrawerVisibility(false)
  }
}
