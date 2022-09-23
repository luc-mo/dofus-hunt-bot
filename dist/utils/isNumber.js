"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isNumber = void 0;
const isNumber = (text) => {
    return !isNaN(parseInt(text));
};
exports.isNumber = isNumber;
