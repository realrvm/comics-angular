export interface AzraImage {
  id: number
  url: string
}

export interface AzraChapter {
  id: string
  comics: AzraImage[]
}

export interface AzraData {
  title: string
  comics: {
    title: string
    picture: {
      url: string
    }
  }[]
}

export interface CacheImage {
  id: number
  blob: Blob
}

export interface ContentData {
  title: string
  amounts: number
  active?: boolean
}

export interface ContentTitleAndId {
  title: string
  imgId: number
}
