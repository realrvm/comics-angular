import { ChangeDetectionStrategy, Component } from '@angular/core'

import { Responsive, ResponsiveDirective } from '@azra/core'
import { SidebarComponent } from '@azra/ui/sidebar'

@Component({
  selector: 'azra-content',
  standalone: true,
  imports: [ResponsiveDirective, SidebarComponent],
  templateUrl: './content.component.html',
  styleUrl: './content.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContentComponent {
  public readonly desktop = Responsive.DESKTOP
  public readonly handset = Responsive.HANDSET
}
