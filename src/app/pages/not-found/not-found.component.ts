import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { Router } from '@angular/router'

@Component({
  selector: 'azra-not-found',
  imports: [],
  templateUrl: './not-found.component.html',
  styles: `
    :host {
      @apply block h-screen bg-black p-4;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotFoundComponent {
  private readonly router = inject(Router)

  public backHome(): void {
    this.router.navigate(['/'])
  }
}
