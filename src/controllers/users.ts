import { UserInterface, CreateUser, DefaultUserValues } from 'types/users'
import { UsersModel } from 'models/Users'
import { Messages } from 'utils/messages'

export module UsersController {
  export const defaultUserValues: DefaultUserValues = {
    direction: '',
    coordinates: {
      x: '',
      y: ''
    }
  }

  export const createUser = async(data: CreateUser): Promise<void> => {
    try {
      const { _id, name, context } = data
      await context.reply(`Hola ${name}, ${Messages.helpMessage}`, Messages.startMessageOptions)
      await context.replyWithVideo(process.env.TUTORIAL_URL as string);
      await UsersModel.create({ _id, name })
    } catch (error: any) {
      throw new Error(error)
    }
  }

  export const resetUser = async(_id: string): Promise<void> => {
    try {
      await UsersModel.findByIdAndUpdate(_id, defaultUserValues)
    } catch (error: any) {
      throw new Error(error)
    }
  }

  export const findUser = async(_id: string): Promise<UserInterface> => {
    try {
      const user = await UsersModel.findById(_id) as UserInterface
      return user!
    } catch (error: any) {
      throw new Error(error)
    }
  }
}