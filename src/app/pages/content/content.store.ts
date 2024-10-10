import { Injectable } from '@angular/core'
import { toSignal } from '@angular/core/rxjs-interop'
import { ComponentStore } from '@ngrx/component-store'
import { Observable } from 'rxjs'

export interface ContentState {
  order: number
}

@Injectable()
export class ContentStore extends ComponentStore<ContentState> {
  constructor() {
    super({ order: 1 })
  }

  private readonly order$: Observable<number> = this.select(
    ({ order }) => order,
  )

  public readonly order = toSignal(this.order$, { initialValue: 1 })

  public readonly incrementOrder = this.updater((state) => ({
    order: ++state.order,
  }))

  public readonly decrementOrder = this.updater((state) => ({
    order: --state.order,
  }))
}
