import { BreakpointObserver } from '@angular/cdk/layout'
import { inject, Injectable } from '@angular/core'
import { toSignal } from '@angular/core/rxjs-interop'
import { debounceTime, map, Observable } from 'rxjs'

import { DEBOUNCE_TIME, Responsive } from '@azra/core'

@Injectable()
export class ResponsiveService {
  private readonly breakpointObserver = inject(BreakpointObserver)

  private responsive$: Observable<Responsive> = this.breakpointObserver
    .observe(['(max-width: 1070px)'])
    .pipe(
      debounceTime(DEBOUNCE_TIME),
      map((result) => {
        const breakpoint = result.breakpoints

        if (breakpoint['(max-width: 1070px)']) {
          return Responsive.HANDSET
        } else return Responsive.DESKTOP
      }),
    )

  public width = toSignal(this.responsive$, {
    initialValue: Responsive.DESKTOP,
  })
}
