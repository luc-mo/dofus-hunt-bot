export interface Hint {
  name: string
  mapCount: number
}

export interface Hints {
  [key: string]: {
    [key: string]: Hint[]
  }
}