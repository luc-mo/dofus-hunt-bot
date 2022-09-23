import { Context } from 'telegraf'
import path from 'path'

import { HintKeyboardData } from 'types/context'
import { Hints } from 'types/hints'
import { UsersModel } from 'models/Users'

import { UsersController } from 'controllers/users'
import { ContextMessages } from 'controllers/context'
import { Hunt } from 'controllers/hunt'

import { isNumber } from 'utils/isNumber'
import { Messages } from 'utils/messages'

export module BotController {
  export const startBot = async(context: Context) => {
    try {
      const { _id, name } = ContextMessages.startContextMessage(context)
      // Verify if user exists
      const user = await UsersModel.findById(_id)
      // If user does not exist, create it
      if(!user) await UsersController.createUser({ _id, name, context })
      // If user exists, reset his coordinates and direction
      else await UsersController.resetUser(_id)
      await context.deleteMessage()
      await context.reply(Messages.firstCoordMessage)
    } catch (error) {
      await context.reply(Messages.errorMessage)
    }
  }

  export const helpBot = async(context: Context) => {
    try {
      const { name } = ContextMessages.helpContextMessage(context)
      await context.reply(`Hola ${name}, ${Messages.helpMessage}`, Messages.startMessageOptions)
      await context.replyWithVideo(process.env.TUTORIAL_URL as string);
    } catch (error) {
      await context.reply(Messages.errorMessage)
    }
  }

  export const resetBot = async(context: Context) => {
    try {
      const { _id } = ContextMessages.resetContextMessage(context)
      // Reset user coordinates and direction
      await UsersController.resetUser(_id)
      await context.deleteMessage()
      await context.reply(Messages.resetMessage)
    } catch (error) {
      await context.reply(Messages.errorMessage)
    }
  }

  export const resetBotQuery = async(context: Context) => {
    try {
      const { _id } = ContextMessages.resetQueryContextMessage(context)
      // Reset user coordinates and direction
      await UsersController.resetUser(_id)
      await context.deleteMessage()
      await context.reply(Messages.resetMessage)
    } catch (error) {
      await context.reply(Messages.errorMessage)
    }
  }

  export const handleCoordinates = async(context: Context) => {
    try {
      const { _id, text } = ContextMessages.coordinatesContextMessage(context)
      const { coordinates } = await UsersController.findUser(_id)
      // If user has not entered any coordinates, save the first one
      if(coordinates.x === '' && isNumber(text)) {
        await Hunt.updateCoordinateX({ _id, coordinates, x: text })
        await context.reply(Messages.secondCoordMessage)
      }
      // If user has entered the first coordinate, save the second one
      else if(coordinates.y === '' && isNumber(text)) { 
        await Hunt.updateCoordinateY({ _id, coordinates, y: text })
        await context.reply(Messages.directionMessage(coordinates.x, text), Messages.directionKeyboard)
      }
      // If user has entered the first and second coordinates, ignore the message
      else if(coordinates.x !== '' && coordinates.y !== '') return
      // If user has entered a non-number, send an error message
      else await context.reply(Messages.nonNumericMessage)
    } catch (error) {
      await context.reply(Messages.errorMessage)
    }
  }

  export const handleDirection = async(context: Context) => {
    try {
      const { _id, data } = ContextMessages.directionContextMessage(context)
      // Get coordinates from database and save the direction
      const { coordinates, direction } = await Hunt.updateDirection({ _id, direction: data })
      const coordinateName = Hunt.getCoordinateName(coordinates)
      // Get hints from dictionary using the coordinate ([x,y]) and direction (top, left, right or bottom)
      const hints = (await import(path.resolve(__dirname, '../../data/hints.json'))).default as Hints
      const currentHints = hints[coordinateName][direction]
      await context.deleteMessage()
      if(!currentHints.length) await context.reply(Messages.changeDirectionMessage, Messages.directionKeyboard)
      else await context.reply(Messages.selectHintMessage, Messages.hintKeyboard(currentHints))
    } catch (error) {
      await context.reply(Messages.errorMessage)
    }
  }

  export const handleHints = async(context: Context) => {
    try {
      await context.deleteMessage()
      const { _id, data } = ContextMessages.hintContextMessage(context)
      // Get previous coordinates and direction from database
      const { coordinates, direction } = await UsersController.findUser(_id)
      const { mapCount } = JSON.parse(data) as HintKeyboardData
      // Update coordinates using map count from selected hint
      const newCoordinates = Hunt.getNewCoordinates(coordinates, direction, mapCount)
      await Hunt.updateBothCoordinates({ _id, coordinates: newCoordinates })
      const newHintMessage = Messages.newHintMessage(newCoordinates, mapCount, direction)
      await context.reply(newHintMessage, Messages.directionKeyboard)
    } catch (error) {
      await context.reply(Messages.errorMessage)
    }
  }
}