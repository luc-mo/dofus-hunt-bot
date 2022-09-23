export interface UserInterface {
  _id: string
  name: string
  direction: string
  coordinates: {
    x: string
    y: string
  }
}

export type DefaultUserValues = Pick<UserInterface, 'direction' | 'coordinates'> 

export interface CreateUser extends Pick<UserInterface, '_id' | 'name'> {
  context: Context
}