import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { RouterLink } from '@angular/router'

import { DrawerService, Responsive, ResponsiveDirective } from '@azra/core'
import { SpriteComponent } from '@azra/icons'
import { TransitionDirective } from '@azra/ui/utils'

@Component({
  selector: 'azra-header',
  imports: [
    CommonModule,
    SpriteComponent,
    TransitionDirective,
    ResponsiveDirective,
    RouterLink,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [],
})
export class HeaderComponent {
  private drawerService = inject(DrawerService)

  public isAboutActive = this.drawerService.aboutDrawerVisibility
  public isContactsActive = this.drawerService.contactsDrawerVisibility
  public desktop = Responsive.DESKTOP
  public handset = Responsive.HANDSET

  public setContactsDrawerVisible(): void {
    this.drawerService.setContactsDrawerVisibility(true)
  }

  public setAboutDrawerVisible(): void {
    this.drawerService.setAboutDrawerVisibility(true)
  }
}
