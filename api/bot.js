import axios from 'axios';
import hints from '../hints.json';

import {
  createUser,
  findUser,
  resetUserValues
} from './controllers/users';
import {
  updateCoordX,
  updateCoordY,
  updateCoords,
  updateDirection,
  updateHints
} from './controllers/coords';

import {
  startMessage,
  startMessageOptions,
  directionKeyboard,
} from './utils/messages';
import isNumber from './utils/isNumber';
import parseDirection from './utils/parseDirection';

export async function startBot(context) {
  const { id, first_name: name } = context.message.chat;
  const user = await findUser(id);
  
  if(!user) await createUser(id, name);
  else await resetUserValues(id);

  context.deleteMessage();
  context.reply(`Hola ${name}, ${startMessage}`, startMessageOptions);
  setTimeout(() => context.reply('Ingresa la primera coordenada.'), 500);
}

export async function resetBot(context) {
  const { id } = context.message.chat;
  await resetUserValues(id);

  context.deleteMessage();
  context.reply('Se ha reiniciado la búsqueda, ingresa la primera coordenada.');
}

export async function resetBotQuery(context) {
  const { id } = context.update.callback_query.from;
  await resetUserValues(id);

  context.deleteMessage();
  context.reply('Se ha reiniciado la búsqueda, ingresa la primera coordenada.');
}


export async function handleCoords(context) {
  const { text, chat } = context.message;
  const { coords } = await findUser(chat.id);
  
  if(coords.x === '' && isNumber(text)) {
    await updateCoordX(chat.id, coords, text);
    context.reply('Ingresa la segunda coordenada.');
  }
  else if(coords.y === '' && isNumber(text)) {
    await updateCoordY(chat.id, coords, text);
    context.reply(`El punto de inicio es: [${coords.x}, ${text}]\n\nIngresa la dirección de la pista.`, directionKeyboard);
  }
  else if(coords.x !== '' && coords.y !== '') return;
  else context.reply('La coordenada debe ser numérica.');
}


export async function handleDirection(context) {
  const { data, from: { id }} = context.update.callback_query;
  const { coords: { x, y }, direction } = await updateDirection(id, data);
  
  const res = await axios.get(`https://dofus-map.com/huntTool/getData.php?x=${x}&y=${y}&direction=${direction}&world=0&language=es`);
  const resHints = res.data.hints;
  
  const hintData = resHints.map(hint => {
    const { x, y, d } = hint;
    return { name: hints[hint.n], x, y, distance: d };
  });
  const keyboard = hintData.map((currentHint, index) => [{ text: currentHint.name, callback_data: `${index}` }]);
  
  await updateHints(id, hintData);
  context.deleteMessage();

  if(hintData.length !== 0) context.reply('Seleccione una pista:', {
    reply_markup: {
      inline_keyboard: keyboard,
    }
  });
  else context.reply('No se han encontrado pistas. ¿Deseas cambiar la dirección?', directionKeyboard);
}

export async function handleHint(context) {
  context.deleteMessage();
  const { data: hintIndex, from: { id }} = context.update.callback_query;
  const { hints, direction } = await findUser(id);
  const { x, y, distance } = hints[hintIndex];
  
  await updateCoords(id, { x, y });

  context.reply(`Nuevas coordenadas: [${x}, ${y}]\n`+
    `Número de pasos: ${distance} ${parseDirection(direction)}\n\n`+
    `Ingresa la dirección de la pista siguiente.`, directionKeyboard);
}