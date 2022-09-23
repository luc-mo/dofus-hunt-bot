"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
const Users_1 = require("models/Users");
const messages_1 = require("utils/messages");
var UsersController;
(function (UsersController) {
    UsersController.defaultUserValues = {
        direction: '',
        coordinates: {
            x: '',
            y: ''
        }
    };
    UsersController.createUser = (data) => __awaiter(this, void 0, void 0, function* () {
        try {
            const { _id, name, context } = data;
            yield context.reply(`Hola ${name}, ${messages_1.Messages.helpMessage}`, messages_1.Messages.startMessageOptions);
            yield context.replyWithVideo(process.env.TUTORIAL_URL);
            yield Users_1.UsersModel.create({ _id, name });
        }
        catch (error) {
            throw new Error(error);
        }
    });
    UsersController.resetUser = (_id) => __awaiter(this, void 0, void 0, function* () {
        try {
            yield Users_1.UsersModel.findByIdAndUpdate(_id, UsersController.defaultUserValues);
        }
        catch (error) {
            throw new Error(error);
        }
    });
    UsersController.findUser = (_id) => __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield Users_1.UsersModel.findById(_id);
            return user;
        }
        catch (error) {
            throw new Error(error);
        }
    });
})(UsersController = exports.UsersController || (exports.UsersController = {}));
