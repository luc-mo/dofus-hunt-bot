export const startMessage = `puedo ayudarte a encontrar el camino de las búsquedas del tesoro en Dofus. En este video podrás encontrar una guía de como utilizar este bot.\n
Puedes reiniciar la búsqueda en cualquier momento utilizando este comando: /reset.\n
Si deseas apoyar a los creadores originales puedes acceder a su <a href='https://dofus-map.com'>sitio web oficial</a> y realizar una donación.`;

export const startMessageOptions = {
  parse_mode: 'HTML',
  disable_web_page_preview: true
}

export const directionKeyboard = {
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