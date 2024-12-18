export const PATHS = {
  home: 'home',
  layout: 'layout',
  content: 'content',
  contentHandset: 'content-handset',
}

export type PathValues = (typeof PATHS)[keyof typeof PATHS]
