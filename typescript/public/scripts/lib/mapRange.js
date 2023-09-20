"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function mapRange(start, end, callback) {
    return [...Array(end).keys()]
        .filter((value) => end >= value && start <= value)
        .map(callback);
}
exports.default = mapRange;
