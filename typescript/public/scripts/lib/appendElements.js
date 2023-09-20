"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (children, parent) => {
    children.map((c) => parent.appendChild(c));
    return parent;
};
