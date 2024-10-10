import { Component, inject } from '@angular/core'
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop'
import { SidebarModule } from 'primeng/sidebar'
import { shareReplay, tap } from 'rxjs'

import { DrawerService } from '@azra/core'
import { SpriteComponent } from '@azra/icons'

import { AboutDrawerService } from './about-drawer.service'

@Component({
  selector: 'azra-about-drawer',
  standalone: true,
  imports: [SidebarModule, SpriteComponent],
  templateUrl: './about-drawer.component.html',
})
export class AboutDrawerComponent {
  public aboutDrawer!: boolean
  private readonly aboutService = inject(AboutDrawerService)

  constructor(private drawerService: DrawerService) {
    toObservable(this.drawerService.aboutDrawerVisibility)
      .pipe(
        tap((val) => (this.aboutDrawer = val)),
        shareReplay(1),
        takeUntilDestroyed(),
      )
      .subscribe()
  }

  public onClose(): void {
    this.drawerService.setAboutDrawerVisibility(false)
  }

  public readonly aboutData = this.aboutService.aboutDataResult
  public readonly aboutError = this.aboutService.aboutDataError
}
