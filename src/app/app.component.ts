import { ChangeDetectionStrategy, Component } from '@angular/core'
import { RouterOutlet } from '@angular/router'

@Component({
  selector: 'azra-root',
  standalone: true,
  imports: [RouterOutlet],
  template: '<router-outlet />',
  styles: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {}
