import { ChangeDetectionStrategy, Component } from '@angular/core'

import { IconComponent } from '@azra/icons'

@Component({
  selector: 'azra-sprite',
  standalone: true,
  imports: [IconComponent],
  templateUrl: './sprite.component.html',
  styles: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpriteComponent {}