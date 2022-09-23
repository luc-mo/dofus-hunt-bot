"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseDirection = void 0;
const parseDirection = (direction) => {
    switch (direction) {
        case 'top':
            return '⬆';
        case 'right':
            return '➡';
        case 'left':
            return '⬅';
        case 'bottom':
            return '⬇';
        default:
            return '';
    }
};
exports.parseDirection = parseDirection;
