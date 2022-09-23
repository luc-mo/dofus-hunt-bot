import { ExtraReplyMessage } from 'telegraf/typings/telegram-types'
import { Hint } from 'types/hints'
import { Coordinates } from 'types/hunt'
import { parseDirection } from 'utils/parseDirection'

export module Messages {
  export const startMessageOptions: ExtraReplyMessage = {
    parse_mode: 'HTML',
    disable_web_page_preview: true
  }

  export const directionKeyboard: ExtraReplyMessage = {
    reply_markup: {
      inline_keyboard: [
        [{ text:'⬆', callback_data: 'top' }],
        [{ text:'⬅', callback_data: 'left' }, { text:'➡', callback_data: 'right' }],
        [{ text:'⬇', callback_data: 'bottom' }],
        [{ text: 'Reiniciar', callback_data: 'reset' }],
      ],
    },
    parse_mode: 'HTML',
  }

  export const hintKeyboard = (currentHints: Hint[]): ExtraReplyMessage => {
    const inline_keyboard = currentHints.map(hint => [{ text: hint.name, callback_data: JSON.stringify({ mapCount: hint.mapCount })}])
    const reply_markup = { inline_keyboard }
    const parse_mode = 'HTML'
    return { reply_markup, parse_mode }
  }

  export const startCommand = `<b>/start</b>: Iniciar el bot.\n`
  export const helpCommand = `<b>/help</b>: Mostrar ayuda.\n`
  export const resetCommand = `<b>/reset</b>: Reiniciar la búsqueda.\n`

  export const startMessage = `puedo ayudarte a encontrar el camino de las búsquedas del tesoro en Dofus. En este video podrás encontrar una guía de como utilizar este bot.\n\n`
  export const commandsMessage = `Los comandos disponibles en este bot son:\n${startCommand}${helpCommand}${resetCommand}\n`
  export const shareMessage = `Si deseas compartir el bot con tus amigos u otros jugadores, puedes utilizar el codigo QR de invitacion al lado del nombre de usuario del bot o utilizando <a href='https://t.me/DofusHuntBot'>este enlace</a>.\n\n`

  export const helpMessage = `${Messages.startMessage}${Messages.commandsMessage}${Messages.shareMessage}`
  
  export const resetMessage = 'Se ha reiniciado la búsqueda, ingresa la primera coordenada.'

  export const firstCoordMessage = 'Ingresa la primera coordenada.'
  export const secondCoordMessage = 'Ingresa la segunda coordenada.'
  export const nonNumericMessage = 'La coordenada debe ser numérica.'

  export const directionMessage = (x: string, y: string) => `El punto de inicio es: <b>[${x}, ${y}]</b>\n\nIngresa la dirección de la pista.`
  export const changeDirectionMessage = 'No se han encontrado pistas. ¿Deseas cambiar la dirección?'

  export const selectHintMessage = 'Seleccione una pista:'
  export const newHintMessage = (coordinates: Coordinates, mapCount: number, direction: string) => {
    return `Nuevas coordenadas: <b>[${coordinates.x}, ${coordinates.y}]</b>\n`+
    `Número de pasos: <b>${mapCount}</b> ${parseDirection(direction)}\n\n`+
    'Ingresa la dirección de la siguiente pista.'
  }

  export const errorMessage = 'Ha ocurrido un error, por favor intentalo de nuevo.'
}