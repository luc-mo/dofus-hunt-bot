import { model, Schema } from 'mongoose'
import { UserInterface } from 'types/users'

export const UsersModel = model<UserInterface>('User', new Schema({
  _id: String,
  name: String,
  direction: { type: String, default: '' },
  coordinates: {
    x: { type: String, default: '' },
    y: { type: String, default: '' }
  },
}))