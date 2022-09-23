"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContextMessages = void 0;
var ContextMessages;
(function (ContextMessages) {
    ContextMessages.startContextMessage = (context) => {
        const { id, first_name: name } = context.message.from;
        const _id = id.toString();
        return { _id, name };
    };
    ContextMessages.helpContextMessage = (context) => {
        const { first_name: name } = context.message.from;
        return { name };
    };
    ContextMessages.resetContextMessage = (context) => {
        const { id } = context.message.from;
        const _id = id.toString();
        return { _id };
    };
    ContextMessages.resetQueryContextMessage = (context) => {
        if (!('callback_query' in context.update))
            throw new Error('Message is not a callback query.');
        const { id } = context.update.callback_query.from;
        const _id = id.toString();
        return { _id };
    };
    ContextMessages.coordinatesContextMessage = (context) => {
        if (!('text' in context.message))
            throw new Error('Message is not a text.');
        const { text, chat: { id } } = context.message;
        const _id = id.toString();
        return { _id, text };
    };
    ContextMessages.directionContextMessage = (context) => {
        if (!('callback_query' in context.update))
            throw new Error('Message is not a callback query.');
        const { data, from: { id } } = context.update.callback_query;
        const _id = id.toString();
        return { _id, data: data };
    };
    ContextMessages.hintContextMessage = (context) => ContextMessages.directionContextMessage(context);
})(ContextMessages = exports.ContextMessages || (exports.ContextMessages = {}));
