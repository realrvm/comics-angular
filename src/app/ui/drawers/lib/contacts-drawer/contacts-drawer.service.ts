import { HttpErrorResponse } from '@angular/common/http'
import { computed, inject, Injectable } from '@angular/core'
import { toSignal } from '@angular/core/rxjs-interop'
import { catchError, filter, map, of, shareReplay } from 'rxjs'

import { ApiService, Result } from '@azra/core'

import { ContactsData } from './contacts.interface'

@Injectable({
  providedIn: 'root',
})
export class ContactsDrawerService {
  private readonly apiService = inject(ApiService)

  private readonly contactsData$ = this.apiService
    .get<{ data: ContactsData[] }>('/contacts')
    .pipe(
      filter((data) => Boolean(data)),
      map(({ data }) => ({ data: data[0] }) as Result<ContactsData>),
      shareReplay(1),
      catchError((err: HttpErrorResponse) =>
        of({ data: undefined, error: err.message } as Result<ContactsData>),
      ),
    )

  private readonly contactsData = toSignal(this.contactsData$, {
    initialValue: { data: {} } as Result<ContactsData>,
  })
  public readonly contactsDataResult = computed(() => this.contactsData()?.data)
  public readonly contactsDataError = computed(() => this.contactsData()?.error)
}
