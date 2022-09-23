export interface StartContextMessage {
  _id: string
  name: string
}

export type HelpContextMessage = Pick<StartContextMessage, 'name'>

export type ResetContextMessage = Pick<StartContextMessage, '_id'>

export interface CoordinatesContextMessage extends Pick<StartContextMessage, '_id'> {
  text: string
}

export interface DirectionContextMessage extends Pick<StartContextMessage, '_id'>  {
  data: string
}

export type HintContextMessage = DirectionContextMessage

export interface HintKeyboardData {
  mapCount: number
}