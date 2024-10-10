export const PATHS = {
  home: 'home',
  layout: 'layout',
  content: 'content',
}

export type PathValues = (typeof PATHS)[keyof typeof PATHS]
