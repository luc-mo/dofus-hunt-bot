export interface Coordinates {
  x: string
  y: string
}

export interface UpdateCoordinate extends Partial<Coordinates> {
  _id: string
  coordinates: Coordinates
  x?: string
  y?: string
}

export interface UpdateDirection extends Pick<UpdateCoordinate, '_id'> {
  direction: string
}