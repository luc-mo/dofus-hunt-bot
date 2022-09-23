"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BotController = void 0;
const path_1 = __importDefault(require("path"));
const Users_1 = require("models/Users");
const users_1 = require("controllers/users");
const context_1 = require("controllers/context");
const hunt_1 = require("controllers/hunt");
const isNumber_1 = require("utils/isNumber");
const messages_1 = require("utils/messages");
var BotController;
(function (BotController) {
    BotController.startBot = (context) => __awaiter(this, void 0, void 0, function* () {
        try {
            const { _id, name } = context_1.ContextMessages.startContextMessage(context);
            // Verify if user exists
            const user = yield Users_1.UsersModel.findById(_id);
            // If user does not exist, create it
            if (!user)
                yield users_1.UsersController.createUser({ _id, name, context });
            // If user exists, reset his coordinates and direction
            else
                yield users_1.UsersController.resetUser(_id);
            yield context.deleteMessage();
            yield context.reply(messages_1.Messages.firstCoordMessage);
        }
        catch (error) {
            yield context.reply(messages_1.Messages.errorMessage);
        }
    });
    BotController.helpBot = (context) => __awaiter(this, void 0, void 0, function* () {
        try {
            const { name } = context_1.ContextMessages.helpContextMessage(context);
            yield context.reply(`Hola ${name}, ${messages_1.Messages.helpMessage}`, messages_1.Messages.startMessageOptions);
            yield context.replyWithVideo(process.env.TUTORIAL_URL);
        }
        catch (error) {
            yield context.reply(messages_1.Messages.errorMessage);
        }
    });
    BotController.resetBot = (context) => __awaiter(this, void 0, void 0, function* () {
        try {
            const { _id } = context_1.ContextMessages.resetContextMessage(context);
            // Reset user coordinates and direction
            yield users_1.UsersController.resetUser(_id);
            yield context.deleteMessage();
            yield context.reply(messages_1.Messages.resetMessage);
        }
        catch (error) {
            yield context.reply(messages_1.Messages.errorMessage);
        }
    });
    BotController.resetBotQuery = (context) => __awaiter(this, void 0, void 0, function* () {
        try {
            const { _id } = context_1.ContextMessages.resetQueryContextMessage(context);
            // Reset user coordinates and direction
            yield users_1.UsersController.resetUser(_id);
            yield context.deleteMessage();
            yield context.reply(messages_1.Messages.resetMessage);
        }
        catch (error) {
            yield context.reply(messages_1.Messages.errorMessage);
        }
    });
    BotController.handleCoordinates = (context) => __awaiter(this, void 0, void 0, function* () {
        try {
            const { _id, text } = context_1.ContextMessages.coordinatesContextMessage(context);
            const { coordinates } = yield users_1.UsersController.findUser(_id);
            // If user has not entered any coordinates, save the first one
            if (coordinates.x === '' && (0, isNumber_1.isNumber)(text)) {
                yield hunt_1.Hunt.updateCoordinateX({ _id, coordinates, x: text });
                yield context.reply(messages_1.Messages.secondCoordMessage);
            }
            // If user has entered the first coordinate, save the second one
            else if (coordinates.y === '' && (0, isNumber_1.isNumber)(text)) {
                yield hunt_1.Hunt.updateCoordinateY({ _id, coordinates, y: text });
                yield context.reply(messages_1.Messages.directionMessage(coordinates.x, text), messages_1.Messages.directionKeyboard);
            }
            // If user has entered the first and second coordinates, ignore the message
            else if (coordinates.x !== '' && coordinates.y !== '')
                return;
            // If user has entered a non-number, send an error message
            else
                yield context.reply(messages_1.Messages.nonNumericMessage);
        }
        catch (error) {
            yield context.reply(messages_1.Messages.errorMessage);
        }
    });
    BotController.handleDirection = (context) => __awaiter(this, void 0, void 0, function* () {
        try {
            const { _id, data } = context_1.ContextMessages.directionContextMessage(context);
            // Get coordinates from database and save the direction
            const { coordinates, direction } = yield hunt_1.Hunt.updateDirection({ _id, direction: data });
            const coordinateName = hunt_1.Hunt.getCoordinateName(coordinates);
            // Get hints from dictionary using the coordinate ([x,y]) and direction (top, left, right or bottom)
            const hints = (yield Promise.resolve().then(() => __importStar(require(path_1.default.resolve(__dirname, '../../data/hints.json'))))).default;
            const currentHints = hints[coordinateName][direction];
            yield context.deleteMessage();
            if (!currentHints.length)
                yield context.reply(messages_1.Messages.changeDirectionMessage, messages_1.Messages.directionKeyboard);
            else
                yield context.reply(messages_1.Messages.selectHintMessage, messages_1.Messages.hintKeyboard(currentHints));
        }
        catch (error) {
            yield context.reply(messages_1.Messages.errorMessage);
        }
    });
    BotController.handleHints = (context) => __awaiter(this, void 0, void 0, function* () {
        try {
            yield context.deleteMessage();
            const { _id, data } = context_1.ContextMessages.hintContextMessage(context);
            // Get previous coordinates and direction from database
            const { coordinates, direction } = yield users_1.UsersController.findUser(_id);
            const { mapCount } = JSON.parse(data);
            // Update coordinates using map count from selected hint
            const newCoordinates = hunt_1.Hunt.getNewCoordinates(coordinates, direction, mapCount);
            yield hunt_1.Hunt.updateBothCoordinates({ _id, coordinates: newCoordinates });
            const newHintMessage = messages_1.Messages.newHintMessage(newCoordinates, mapCount, direction);
            yield context.reply(newHintMessage, messages_1.Messages.directionKeyboard);
        }
        catch (error) {
            yield context.reply(messages_1.Messages.errorMessage);
        }
    });
})(BotController = exports.BotController || (exports.BotController = {}));
