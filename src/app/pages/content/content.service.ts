import { HttpClient } from '@angular/common/http'
import { effect, inject, Injectable, signal } from '@angular/core'
import { toObservable, toSignal } from '@angular/core/rxjs-interop'
import { catchError, EMPTY, from, mergeMap, of, switchMap, tap } from 'rxjs'

import { ApiService } from '@azra/core'

import { AzraChapter, AzraData } from './content.interface'
import { contentUrl } from './content.utils'

interface CacheImage {
  id: number
  blob: Blob
}

@Injectable({ providedIn: 'root' })
export class ContentService {
  private readonly http = inject(HttpClient)
  private readonly apiService = inject(ApiService)
  private readonly contentUrl = contentUrl

  private _ids = signal<number[]>([])
  private _cachedImages: CacheImage[] = []

  //

  private imgUrl = signal<AzraChapter[]>([])
  // eslint-disable-next-line
  private content$ = this.http.get<any>(this.contentUrl)
  // private readonly contentBlob$ = this.http.get<any>(
  //   'http://localhost:1337/uploads/small_3_a74da2d4c3.jpg',
  //   { responseType: 'blob' as 'json' },
  // )
  private readonly content = toSignal(this.content$, {
    initialValue: { data: [] },
  })
  //private readonly contentBlob = toSignal(this.contentBlob$)
  private readonly effect = effect(
    () => {
      const azraChapters: AzraData[] =
        this.content()?.data[0]?.arcs.arc[0].chapters
      this.imgUrl.set(transformAzraResponse(azraChapters))
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
              //const url = `https://picsum.photos/id/${ids}/200/300`
              const url = 'http://localhost:1337'
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
          //const url = `https://picsum.photos/id/${ids}/200/300`
          const large = this.imgUrl()[0].comics.find(
            (comic) => comic.id === ids,
          )
          const url = `http://localhost:1337` + large?.large

          return this.http
            .get(url, { responseType: 'blob' })
            .pipe(tap((blob) => this.checkAndCacheImage(ids, blob)))
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
