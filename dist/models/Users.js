"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersModel = void 0;
const mongoose_1 = require("mongoose");
exports.UsersModel = (0, mongoose_1.model)('User', new mongoose_1.Schema({
    _id: String,
    name: String,
    direction: { type: String, default: '' },
    coordinates: {
        x: { type: String, default: '' },
        y: { type: String, default: '' }
    },
}));
