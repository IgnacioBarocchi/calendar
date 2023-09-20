"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// todo: static
const createElement_ts_1 = require("../../../lib/createElement.ts");
const mapRange_ts_1 = __importDefault(require("../../../lib/mapRange.ts"));
class CalendarHeaderColumn {
    /*private? | {get, _} accessor*/ calendarHeaderColumnElements = [];
    getElements() {
        (0, mapRange_ts_1.default)(0, 24, (hour) => {
            const time = new Date();
            time.setHours(hour, 0, 0);
            const textContent = time.toLocaleString("en-US", {
                hour: "numeric",
                hour12: true,
            });
            this.calendarHeaderColumnElements.push((0, createElement_ts_1.createElement2)(`<div class="grid-item header-column-item">
                <div class="header-text-container">
                    <span>${textContent}</span>
                </div>
            </div>`));
        });
        return this.calendarHeaderColumnElements;
    }
}
exports.default = CalendarHeaderColumn;
