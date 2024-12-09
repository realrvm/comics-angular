import { HttpClient } from '@angular/common/http'
import { inject, Injectable, signal } from '@angular/core'
import {
  BehaviorSubject,
  catchError,
  combineLatest,
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

  private _ids = signal<number[]>([])
  private _cachedImages: CacheImage[] = []

  private checkAndCacheImage(id: number, blob: Blob) {
    if (this._ids().indexOf(id) > -1) {
      this._cachedImages.push({ id, blob })
    }
  }

  private getRangeArray(id = 1): number[] {
    if (id > 1) return [id - 1, id, id + 1, id + 2]

    return [3, 2, 1]
  }

  private readonly content$ = this.http
    // eslint-disable-next-line
    .get<any>(this.contentUrl)
    .pipe(
      map((res) => {
        const chapters = res.data[0].arcs.arc[0].chapters

        return transformAzraResponse(chapters)
      }),
    )

  public subject = new BehaviorSubject(1)
  public readonly subject$ = this.subject.asObservable()

  public data$ = combineLatest(this.content$, this.subject$).pipe(
    tap((responses) => {
      // eslint-disable-next-line
      const [_, imgId] = responses
      this._ids.set(this.getRangeArray(imgId))

      const filteredBlobs = this._cachedImages.filter(({ id }) =>
        this._ids().includes(id),
      )
      this._cachedImages = getOriginals(filteredBlobs)
    }),
  )

  public blob$ = this.data$.pipe(
    switchMap((responses) => {
      const [content, id] = responses
      const index = this._cachedImages.findIndex((img) => img.id === id)

      if (index > -1) {
        return from(this.getRangeArray(id)).pipe(
          mergeMap((ids) => {
            const currentIndex = this._cachedImages.findIndex(
              (img) => img.id === ids,
            )

            if (currentIndex === -1) {
              const azra = content[0].comics.find((comic) => comic.id === ids)
              const url = 'https://blood-of-azra.site' + azra?.large
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

      return from(this.getRangeArray(id)).pipe(
        mergeMap((ids) =>
          of(ids).pipe(
            switchMap(() => {
              const azra = content[0].comics.find((comic) => comic.id === ids)

              const url = 'https://blood-of-azra.site' + azra?.large

              return this.http.get<Blob>(url, {
                responseType: 'blob' as 'json',
              })
            }),
            tap((blob) => {
              this._cachedImages.push({ id: ids, blob })
              this._ids.update((prev) => [...new Set([...prev, ids])])
            }),
            map(() => {
              const blob = this._cachedImages.find((img) => img.id === id)
              return blob?.blob
            }),
            filter(Boolean),
          ),
        ),
      )
    }),
    catchError(() => {
      return EMPTY
    }),
  )
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
