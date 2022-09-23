"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Messages = void 0;
const parseDirection_1 = require("utils/parseDirection");
var Messages;
(function (Messages) {
    Messages.startMessageOptions = {
        parse_mode: 'HTML',
        disable_web_page_preview: true
    };
    Messages.directionKeyboard = {
        reply_markup: {
            inline_keyboard: [
                [{ text: '⬆', callback_data: 'top' }],
                [{ text: '⬅', callback_data: 'left' }, { text: '➡', callback_data: 'right' }],
                [{ text: '⬇', callback_data: 'bottom' }],
                [{ text: 'Reiniciar', callback_data: 'reset' }],
            ],
        },
        parse_mode: 'HTML',
    };
    Messages.hintKeyboard = (currentHints) => {
        const inline_keyboard = currentHints.map(hint => [{ text: hint.name, callback_data: JSON.stringify({ mapCount: hint.mapCount }) }]);
        const reply_markup = { inline_keyboard };
        const parse_mode = 'HTML';
        return { reply_markup, parse_mode };
    };
    Messages.startCommand = `<b>/start</b>: Iniciar el bot.\n`;
    Messages.helpCommand = `<b>/help</b>: Mostrar ayuda.\n`;
    Messages.resetCommand = `<b>/reset</b>: Reiniciar la búsqueda.\n`;
    Messages.startMessage = `puedo ayudarte a encontrar el camino de las búsquedas del tesoro en Dofus. En este video podrás encontrar una guía de como utilizar este bot.\n\n`;
    Messages.commandsMessage = `Los comandos disponibles en este bot son:\n${Messages.startCommand}${Messages.helpCommand}${Messages.resetCommand}\n`;
    Messages.shareMessage = `Si deseas compartir el bot con tus amigos u otros jugadores, puedes utilizar el codigo QR de invitacion al lado del nombre de usuario del bot o utilizando <a href='https://t.me/DofusHuntBot'>este enlace</a>.\n\n`;
    Messages.helpMessage = `${Messages.startMessage}${Messages.commandsMessage}${Messages.shareMessage}`;
    Messages.resetMessage = 'Se ha reiniciado la búsqueda, ingresa la primera coordenada.';
    Messages.firstCoordMessage = 'Ingresa la primera coordenada.';
    Messages.secondCoordMessage = 'Ingresa la segunda coordenada.';
    Messages.nonNumericMessage = 'La coordenada debe ser numérica.';
    Messages.directionMessage = (x, y) => `El punto de inicio es: <b>[${x}, ${y}]</b>\n\nIngresa la dirección de la pista.`;
    Messages.changeDirectionMessage = 'No se han encontrado pistas. ¿Deseas cambiar la dirección?';
    Messages.selectHintMessage = 'Seleccione una pista:';
    Messages.newHintMessage = (coordinates, mapCount, direction) => {
        return `Nuevas coordenadas: <b>[${coordinates.x}, ${coordinates.y}]</b>\n` +
            `Número de pasos: <b>${mapCount}</b> ${(0, parseDirection_1.parseDirection)(direction)}\n\n` +
            'Ingresa la dirección de la siguiente pista.';
    };
    Messages.errorMessage = 'Ha ocurrido un error, por favor intentalo de nuevo.';
})(Messages = exports.Messages || (exports.Messages = {}));
