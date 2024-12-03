import { HttpClient } from '@angular/common/http'
import { inject, Injectable, signal } from '@angular/core'
import { toObservable, toSignal } from '@angular/core/rxjs-interop'
import { filter, from, map, mergeMap, of, switchMap, tap } from 'rxjs'

import { ApiService } from '@azra/core'

import { AzraChapter, AzraData, CacheImage } from './content.interface'
import { contentUrl } from './content.utils'

@Injectable({
  providedIn: 'root',
})
export class AzraService {
  private readonly http = inject(HttpClient)
  private readonly apiService = inject(ApiService)
  private readonly contentUrl = contentUrl

  public data = signal<AzraChapter[]>([])
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
        from(getRangeArray(1)).pipe(
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
            ),
          ),
        ),
      ),
    )

  public readonly content = toSignal(this.content$)

  public imgId = signal<number | undefined>(undefined)

  private getImage$ = toObservable(this.imgId).pipe(
    filter(Boolean),
    tap((imgId) => {
      this._ids.update((prev) => [...new Set([...prev, imgId])])

      const filteredBlobs = this._cachedImages.filter(({ id }) =>
        this._ids().includes(id),
      )
      this._cachedImages = getOriginals(filteredBlobs)
    }),
    switchMap((id) => {
      const index = this._cachedImages.findIndex((img) => img.id === id)

      return of(index).pipe(
        map((i) => {
          if (i > -1) {
            const image = this._cachedImages[i]
            return image.blob
          }
          return new Blob()
        }),
      )

      // return of(id).pipe(
      //   mergeMap((ids) => {
      //     return of(ids)
      //     // const azra = this.content()[0].comics?.find(
      //     //   (comic) => comic.id === ids,
      //     // )
      //     // const url = 'http://localhost:1337' + azra?.large
      //     //
      //     // return this.http
      //     //   .get(url, { responseType: 'blob' })
      //     //   .pipe(tap((blob) => this.checkAndCacheImage(ids, blob)))
      //   }),
      // )
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
