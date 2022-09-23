import { Context } from 'telegraf'
import {
  StartContextMessage,
  HelpContextMessage,
  ResetContextMessage,
  CoordinatesContextMessage,
  DirectionContextMessage,
  HintContextMessage
} from 'types/context'

export module ContextMessages {
  export const startContextMessage = (context: Context): StartContextMessage => {
    const { id, first_name: name } = context.message!.from
    const _id = id.toString()
    return { _id, name }
  }

  export const helpContextMessage = (context: Context): HelpContextMessage => {
    const { first_name: name } = context.message!.from
    return { name }
  }

  export const resetContextMessage = (context: Context): ResetContextMessage => {
    const { id } = context.message!.from
    const _id = id.toString()
    return { _id }
  }

  export const resetQueryContextMessage = (context: Context): ResetContextMessage => {
    if(!('callback_query' in context.update)) throw new Error('Message is not a callback query.')
    const { id } = context.update.callback_query.from
    const _id = id.toString()
    return { _id }
  }

  export const coordinatesContextMessage = (context: Context): CoordinatesContextMessage => {
    if(!('text' in context.message!)) throw new Error('Message is not a text.')
    const { text, chat: { id }} = context.message
    const _id = id.toString()
    return { _id, text }
  }

  export const directionContextMessage = (context: Context): DirectionContextMessage => {
    if(!('callback_query' in context.update)) throw new Error('Message is not a callback query.')
    const { data, from: { id }} = context.update.callback_query
    const _id = id.toString()
    return { _id, data: data! }
  }

  export const hintContextMessage = (context: Context): HintContextMessage => directionContextMessage(context)
}