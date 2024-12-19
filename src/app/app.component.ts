import { ChangeDetectionStrategy, Component } from '@angular/core'
import { RouterOutlet } from '@angular/router'

@Component({
  selector: 'azra-root',
  standalone: true,
  imports: [RouterOutlet],
  template: '<router-outlet />',
  styles: `
    :host {
      @apply block bg-black min-h-screen;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {}
