import { HttpClient } from '@angular/common/http'
import { computed, inject, Injectable, signal } from '@angular/core'
import { toObservable, toSignal } from '@angular/core/rxjs-interop'
import {
  catchError,
  EMPTY,
  filter,
  from,
  map,
  mergeMap,
  of,
  switchMap,
  tap,
} from 'rxjs'

import { ApiService } from '@azra/core'

import { AzraChapter, AzraData, CacheImage } from './content.interface'
import { contentUrl } from './content.utils'

@Injectable({
  providedIn: 'root',
})
export class ContentService {
  private readonly http = inject(HttpClient)
  private readonly apiService = inject(ApiService)
  private readonly contentUrl = contentUrl

  public data = signal<AzraChapter[]>([])
  public dataLength = computed(() => this.data()[0].comics.length)
  private _ids = signal<number[]>([])
  private _cachedImages: CacheImage[] = []

  private readonly content$ = this.http
    // eslint-disable-next-line
    .get<any>(this.contentUrl)
    .pipe(
      map((res) => {
        const chapters = res.data[0].arcs.arc[0].chapters

        return transformAzraResponse(chapters)
      }),
      tap((data) => this.data.set(data)),
      switchMap((content) =>
        from(this.getRangeArray()).pipe(
          mergeMap((ids) =>
            of(ids).pipe(
              switchMap(() => {
                const azra = content[0].comics.find((comic) => comic.id === ids)

                const url = 'http://localhost:1337' + azra?.large

                return this.http.get<Blob>(url, {
                  responseType: 'blob' as 'json',
                })
              }),
              tap((blob) => {
                this._cachedImages.push({ id: ids, blob })
                this._ids.update((prev) => [...new Set([...prev, ids])])
              }),
              map(() => {
                const blob = this._cachedImages.find((img) => img.id === 1)
                return blob?.blob
              }),
              filter(Boolean),
            ),
          ),
        ),
      ),
    )

  public readonly content = toSignal(this.content$)

  public imgId = signal<number | undefined>(undefined)
  private readonly imgIdCurrent = computed(() => {
    if (this.imgId()) {
      return this.imgId()! < this.dataLength() - 1
        ? this.imgId()
        : this.dataLength() - 1
    }
    return undefined
  })

  private getImage$ = toObservable(this.imgIdCurrent).pipe(
    filter(Boolean),
    tap((imgId) => {
      this._ids.set(this.getRangeArray(imgId))

      const filteredBlobs = this._cachedImages.filter(({ id }) =>
        this._ids().includes(id),
      )
      this._cachedImages = getOriginals(filteredBlobs)
    }),
    switchMap((id) => {
      const index = this._cachedImages.findIndex((img) => img.id === id)

      return from(this.getRangeArray(id)).pipe(
        mergeMap((ids) => {
          const currentIndex = this._cachedImages.findIndex(
            (img) => img.id === ids,
          )

          if (currentIndex === -1) {
            const azra = this.data()[0].comics.find((comic) => comic.id === ids)
            const url = 'http://localhost:1337' + azra?.large
            this.http
              .get(url, { responseType: 'blob' })
              .pipe(tap((blob) => this.checkAndCacheImage(ids, blob)))
              .subscribe()
          }

          const image = this._cachedImages[index]
          return of(image.blob)
        }),
      )
    }),
    catchError(() => {
      return EMPTY
    }),
  )

  public readonly getImage = toSignal(this.getImage$)

  private checkAndCacheImage(id: number, blob: Blob) {
    if (this._ids().indexOf(id) > -1) {
      this._cachedImages.push({ id, blob })
    }
  }

  private getRangeArray(id = 1): number[] {
    const diff = this.dataLength()

    if (id > 1)
      return [id - 1, id, id + 1, id + 2].filter((num) => num <= diff - 1)

    return [3, 2, 1].filter((num) => num <= diff - 1)
  }
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

function transformAzraResponse(azra: AzraData[] = []): AzraChapter[] {
  return azra.map(({ title, comics }) => ({
    id: title,
    comics: comics.map(({ title: comicTitle, picture }) => ({
      id: Number(comicTitle),
      small: picture?.formats.small.url,
      large: picture?.formats.large.url,
    })),
  }))
}
