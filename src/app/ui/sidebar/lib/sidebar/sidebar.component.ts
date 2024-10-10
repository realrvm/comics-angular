import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { Router } from '@angular/router'

import { Responsive, ResponsiveDirective } from '@azra/core'
import { SpriteComponent } from '@azra/icons'

@Component({
  selector: 'azra-sidebar',
  standalone: true,
  imports: [ResponsiveDirective, SpriteComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent {
  private router = inject(Router)

  public handset = Responsive.HANDSET
  public desktop = Responsive.DESKTOP

  public goHome() {
    this.router.navigate([''])
  }
}
