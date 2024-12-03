export interface AzraImage {
  id: number
  small: string
  large: string
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
      formats: {
        small: { url: string }
        large: { url: string }
      }
    }
  }[]
}

export interface CacheImage {
  id: number
  blob: Blob
}
