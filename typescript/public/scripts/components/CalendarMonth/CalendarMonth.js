"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_ts_1 = require("../../constants/index.ts");
const NavigationControls_ts_1 = __importDefault(require("../../controls/NavigationControls.ts"));
const appendElements_ts_1 = __importDefault(require("../../lib/appendElements.ts"));
const createElement_ts_1 = require("../../lib/createElement.ts");
class CalendarMonth {
    // save previous state | cach month
    calendarBodyElement = document.querySelector("#days-of-month-body");
    calendarHeaderElement = document.querySelector("#days-of-month-header");
    monthLabel = document.querySelector("#days-of-month-month-label");
    days = [];
    storage;
    constructor(storage) {
        this.storage = storage;
        (0, appendElements_ts_1.default)(index_ts_1.DAYS_ABBREVIATIONS.map((day) => {
            return (0, createElement_ts_1.createElement2)(`
        <div class='calendar-day-cell'>
            <span class='${day.toLowerCase() ===
                new Date()
                    .toLocaleDateString("en-US", { weekday: "short" })
                    .toLocaleLowerCase()
                ? "highlighted-text"
                : ""}'>${day}</span>
        </div>
        `);
        }), this.calendarHeaderElement);
    }
    render() {
        this.monthLabel.textContent = this.storage.getMonthOfYear();
        const stratDate = this.storage.selectedWeek[0];
        const month = stratDate.getMonth();
        const year = stratDate.getFullYear();
        this.days = [];
        const date = new Date(year, month, 1);
        while (date.getMonth() === month) {
            this.days.push(new Date(date));
            date.setDate(date.getDate() + 1);
        }
        (0, appendElements_ts_1.default)(this.days.map((day) => {
            const dayOfMonthElement = (0, createElement_ts_1.createElement2)(`
            <div class="calendar-day-cell ${day.toDateString() === new Date().toDateString()
                ? "today-highlight"
                : ""}">
                <span>${day.getDate()}</span>
            </div>
        `);
            dayOfMonthElement.addEventListener("click", () => {
                if (!this.storage.selectedWeek.find((date) => date.toDateString() === day.toDateString())) {
                    const navigationControls = new NavigationControls_ts_1.default();
                    navigationControls.navigateWithDaysOfMonth(date);
                }
            });
            return dayOfMonthElement;
        }), this.calendarBodyElement);
    }
}
exports.default = CalendarMonth;
