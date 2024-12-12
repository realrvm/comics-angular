import { HttpClient, HttpErrorResponse } from '@angular/common/http'
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

import { ApiService, LocalStorageService } from '@azra/core'

import {
  AzraChapter,
  AzraData,
  CacheImage,
  ContentData,
  ContentTitleAndId,
} from './content.interface'
import { contentUrl } from './content.utils'

@Injectable({
  providedIn: 'root',
})
export class ContentService {
  private readonly http = inject(HttpClient)
  private readonly apiService = inject(ApiService)
  private readonly localStorageService = inject(LocalStorageService)
  private readonly localStorageValue = this.localStorageService.get(
    'azraLastImageNumber',
  ) as string
  private readonly contentUrl = contentUrl
  private readonly contentTitleAndId = signal<ContentTitleAndId[]>([])
  public readonly contentData = signal<ContentData[]>([])

  private _ids = signal<number[]>([])
  private _cachedImages: CacheImage[] = []

  private readonly comicsSource$ = this.apiService
    // eslint-disable-next-line
    .get<any>(this.contentUrl)
    .pipe(
      filter((data) => Boolean(data)),
      map((res) => {
        const chapters = res.data[0].arcs.arc[0].chapters
        const content = transformAzraResponse(chapters)
        this.contentData.set(getContentData(content))
        this.contentTitleAndId.set(getContentTitleAndId(content))

        const commonContent = content.map((item) => item.comics).flat()
        return commonContent
      }),
      catchError(() => EMPTY),
    )

  public subject = new BehaviorSubject(Number(this.localStorageValue) || 1)
  public readonly subject$ = this.subject.asObservable()

  public readonly comicsFilteredSource$ = combineLatest(
    this.comicsSource$,
    this.subject$,
  ).pipe(
    tap((responses) => {
      const [, imgId] = responses
      this._ids.set(this.getRangeArray(imgId))

      const filteredBlobs = this._cachedImages.filter(({ id }) =>
        this._ids().includes(id),
      )
      this._cachedImages = getOriginals(filteredBlobs)
    }),
  )

  public readonly comicBlob$ = this.comicsFilteredSource$.pipe(
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
              const azra = content.find((comic) => comic.id === ids)
              if (azra === undefined) throw new Error('Not found')

              const url = 'https://blood-of-azra.site' + azra?.large
              this.http
                .get(url, { responseType: 'blob' })
                .pipe(tap((blob) => this.checkAndCacheImage(ids, blob)))
                .subscribe()
            }

            const image = this._cachedImages[index]
            this.localStorageService.set('azraLastImageNumber', image.id)
            return of(image.blob)
          }),
        )
      }

      return from(this.getRangeArray(id)).pipe(
        mergeMap((ids) =>
          of(ids).pipe(
            switchMap(() => {
              const azra = content.find((comic) => comic.id === ids)
              if (azra === undefined) throw new Error('Not found')

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
    catchError((e: HttpErrorResponse) => {
      this.localStorageService.set('azraLastImageNumber', 1)
      console.log(e)
      return EMPTY
    }),
  )

  public findComicByChapterClick(title: string) {
    const contentAzra = this.contentTitleAndId().find(
      (item) => item.title === title,
    )

    if (contentAzra) this.subject.next(contentAzra.imgId)
  }

  private checkAndCacheImage(id: number, blob: Blob) {
    if (this._ids().indexOf(id) > -1) {
      this._cachedImages.push({ id, blob })
    }
  }

  private getRangeArray(id = 1): number[] {
    if (id > 1) return [id - 1, id, id + 1, id + 2]

    return [3, 2, 1]
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

function getContentData(content: AzraChapter[]): ContentData[] {
  const res: ContentData[] = []

  for (const item of content) {
    const title = item?.id || ''
    const comicsAmount = item.comics?.length

    res.push({ title, amounts: comicsAmount, active: false })
  }

  return res
}

function getContentTitleAndId(content: AzraChapter[]): ContentTitleAndId[] {
  const res: ContentTitleAndId[] = []

  for (const item of content) {
    const title = item.id
    const imgId = item.comics[0].id

    res.push({ title, imgId })
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
