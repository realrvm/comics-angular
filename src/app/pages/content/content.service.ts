import { HttpClient } from '@angular/common/http'
import { effect, inject, Injectable, signal } from '@angular/core'
import { toObservable, toSignal } from '@angular/core/rxjs-interop'
import { catchError, EMPTY, from, mergeMap, of, switchMap, tap } from 'rxjs'

import { ApiService } from '@azra/core'

import { contentUrl } from './content.utils'

interface CacheImage {
  id: number
  blob: Blob
}

@Injectable({
  providedIn: 'root',
})
export class ContentService {
  private readonly http = inject(HttpClient)
  private readonly apiService = inject(ApiService)
  private readonly contentUrl = contentUrl

  private _ids = signal<number[]>([])
  private _cachedImages: CacheImage[] = []

  //

  private readonly imgUrl = signal<string>('')
  // eslint-disable-next-line
  private readonly content$ = this.http.get<any>(this.contentUrl)
  private readonly content = toSignal(this.content$)
  private readonly effect = effect(
    () => {
      const comicsArr =
        this.content()?.data[0].arcs.arc[0].chapters[0].comics.find(
          ({ title }: { title: string }) => title === '1',
        )
      console.log(comicsArr?.picture.formats.medium.url)
    },
    { allowSignalWrites: true },
  )
  //

  public imgId = signal(1)

  private getImage$ = toObservable(this.imgId).pipe(
    tap((imgId) => {
      this._ids.set(getRangeArray(imgId))

      const filteredBlobs = this._cachedImages.filter(({ id }) =>
        this._ids().includes(id),
      )
      this._cachedImages = getOriginals(filteredBlobs)
    }),
    switchMap((id) => {
      const index = this._cachedImages.findIndex((img) => img.id === id)

      if (index > -1) {
        return from(getRangeArray(id)).pipe(
          mergeMap((ids) => {
            const currentIndex = this._cachedImages.findIndex(
              (img) => img.id === ids,
            )

            if (currentIndex === -1) {
              const url = `https://picsum.photos/id/${ids}/200/300`
              this.http
                .get(url, { responseType: 'blob' })
                .pipe(tap((blob) => this.checkAndCacheImage(ids, blob)))
                .subscribe()
            }

            const image = this._cachedImages[index]
            return of(image.blob)
          }),
        )
      }

      return from(getRangeArray(id)).pipe(
        mergeMap((ids) => {
          const url = `https://picsum.photos/id/${ids}/200/300`

          return this.http
            .get(url, { responseType: 'blob' })
            .pipe(tap((blob) => this.checkAndCacheImage(ids, blob)))
        }),
      )
    }),
    catchError(() => {
      console.log('error')
      return EMPTY
    }),
  )

  public readonly getImage = toSignal(this.getImage$)

  private checkAndCacheImage(id: number, blob: Blob) {
    if (this._ids().indexOf(id) > -1) {
      this._cachedImages.push({ id, blob })
    }
  }
}

function getRangeArray(id: number): number[] {
  if (id > 1) return [id - 1, id, id + 1, id + 2]
  return [3, 2, 1]
}

function getOriginals(array: CacheImage[]): CacheImage[] {
  const res: CacheImage[] = []
  const ids: number[] = []

  for (const item of array) {
    if (!ids.includes(item.id)) {
      ids.push(item.id)
      res.push(item)
    }
  }
  return res
}
