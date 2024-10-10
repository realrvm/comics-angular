import { ChangeDetectionStrategy, Component } from '@angular/core'
import { RouterOutlet } from '@angular/router'

import { LayoutComponent } from '@azra/ui/layout'

@Component({
  selector: 'azra-home',
  standalone: true,
  imports: [LayoutComponent, RouterOutlet],
  template: `
    <azra-layout />

    <router-outlet name="contacts-drawer" />
    <router-outlet name="about-drawer" />
  `,
  styles: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {}
