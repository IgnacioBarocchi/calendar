"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createElement2 = exports.createElement = void 0;
const createElement = (tagName, options) => {
    const element = document.createElement(tagName);
    const { className, innerHTML } = options || {};
    if (innerHTML) {
        element.innerHTML = innerHTML.trim();
    }
    if (className) {
        element.classList.add(className);
    }
    return element;
};
exports.createElement = createElement;
const createElement2 = (html) => {
    const node = new DOMParser().parseFromString(html, "text/html").body
        .firstElementChild;
    return node;
};
exports.createElement2 = createElement2;
