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
exports.Hunt = void 0;
const Users_1 = require("models/Users");
var Hunt;
(function (Hunt) {
    Hunt.getCoordinateName = (coordinates) => `[${coordinates.x},${coordinates.y}]`;
    Hunt.getNewCoordinates = (coordinates, direction, mapCount) => {
        const xNumber = parseInt(coordinates.x);
        const yNumber = parseInt(coordinates.y);
        switch (direction) {
            case 'top':
                return { x: coordinates.x, y: (yNumber - mapCount).toString() };
            case 'left':
                return { x: (xNumber - mapCount).toString(), y: coordinates.y };
            case 'right':
                return { x: (xNumber + mapCount).toString(), y: coordinates.y };
            case 'bottom':
                return { x: coordinates.x, y: (yNumber + mapCount).toString() };
            default:
                return { x: '', y: '' };
        }
    };
    Hunt.updateCoordinateX = (data) => __awaiter(this, void 0, void 0, function* () {
        try {
            const { _id, coordinates, x } = data;
            yield Users_1.UsersModel.findByIdAndUpdate(_id, { coordinates: Object.assign(Object.assign({}, coordinates), { x }) }, { new: true });
        }
        catch (error) {
            throw new Error(error);
        }
    });
    Hunt.updateCoordinateY = (data) => __awaiter(this, void 0, void 0, function* () {
        try {
            const { _id, coordinates, y } = data;
            yield Users_1.UsersModel.findByIdAndUpdate(_id, { coordinates: Object.assign(Object.assign({}, coordinates), { y }) }, { new: true });
        }
        catch (error) {
            throw new Error(error);
        }
    });
    Hunt.updateBothCoordinates = (data) => __awaiter(this, void 0, void 0, function* () {
        try {
            const { _id, coordinates } = data;
            yield Users_1.UsersModel.findByIdAndUpdate(_id, { coordinates }, { new: true });
        }
        catch (error) {
            throw new Error(error);
        }
    });
    Hunt.updateDirection = (data) => __awaiter(this, void 0, void 0, function* () {
        try {
            const { _id, direction } = data;
            const updatedUser = yield Users_1.UsersModel.findByIdAndUpdate(_id, { direction }, { new: true });
            return updatedUser;
        }
        catch (error) {
            throw new Error(error);
        }
    });
})(Hunt = exports.Hunt || (exports.Hunt = {}));
