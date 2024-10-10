import { HttpErrorResponse } from '@angular/common/http'
import { computed, inject, Injectable } from '@angular/core'
import { toSignal } from '@angular/core/rxjs-interop'
import { catchError, filter, map, of, shareReplay } from 'rxjs'

import { ApiService, Result } from '@azra/core'

import { AboutData } from './about.interface'

@Injectable({
  providedIn: 'root',
})
export class AboutDrawerService {
  private readonly apiService = inject(ApiService)

  private aboutData$ = this.apiService
    .get<{ data: AboutData[] }>('/abouts')
    .pipe(
      filter((data) => Boolean(data)),
      map(({ data }) => ({ data: data[0] }) as Result<AboutData>),
      shareReplay(1),
      catchError((err: HttpErrorResponse) =>
        of({ data: undefined, error: err.message } as Result<AboutData>),
      ),
    )

  private readonly aboutData = toSignal(this.aboutData$, {
    initialValue: { data: {} } as Result<AboutData>,
  })
  public readonly aboutDataResult = computed(() => this.aboutData()?.data)
  public readonly aboutDataError = computed(() => this.aboutData()?.error)
}
