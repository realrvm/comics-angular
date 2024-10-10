import { ChangeDetectionStrategy, Component } from '@angular/core'

import { AboutDrawerComponent, ContactsDrawerComponent } from '@azra/ui/drawers'
import { LayoutComponent } from '@azra/ui/layout'

@Component({
  selector: 'azra-home',
  standalone: true,
  imports: [LayoutComponent, AboutDrawerComponent, ContactsDrawerComponent],
  template: `
    <azra-layout />

    @defer {
      <azra-about-drawer />
    }

    @defer {
      <azra-contacts-drawer />
    }
  `,
  styles: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {}
