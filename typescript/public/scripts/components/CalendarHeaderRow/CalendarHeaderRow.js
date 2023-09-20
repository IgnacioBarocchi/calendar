"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_ts_1 = require("../../constants/index.ts");
const appendElements_ts_1 = __importDefault(require("../../lib/appendElements.ts"));
const createElement_ts_1 = require("../../lib/createElement.ts");
class CalendarHeaderRow {
    storage;
    dayOfTheWeekElements = [];
    dateDataByDayName = {};
    parentElement = document.querySelector("#calendar-header-row-container");
    monthLabel = document.querySelector("#header-month-label");
    constructor(storage) {
        this.storage = storage;
        const timeZoneOffsetElement = (0, createElement_ts_1.createElement2)(`
      <div class="grid-item header-row">
        <div class="header-text-container">
          <span class="date-name">${index_ts_1.TIME_ZONE_OFFSET}</span>
        </div>
      </div>`);
        this.updateDateOfWeekElements();
        (0, appendElements_ts_1.default)([timeZoneOffsetElement, ...this.dayOfTheWeekElements], this.parentElement);
    }
    /*private*/ updateDateDataByDayName() {
        this.storage.selectedWeek.forEach((dateTime) => {
            this.dateDataByDayName[index_ts_1.DAYS_ABBREVIATIONS[dateTime.getDay()]] = {
                date: dateTime.getDate(),
                today: dateTime.toDateString() === new Date().toDateString(),
            };
        });
    }
    updateDateOfWeekElements() {
        if (!this.storage.selectedWeek)
            return;
        this.updateDateDataByDayName();
        const shouldCreateElements = this.dayOfTheWeekElements?.length !== 7;
        // !unnecessary variable evaluation
        // !code split: create calendar in constructor. update in render method
        if (shouldCreateElements) {
            this.dayOfTheWeekElements = Object.entries(this.dateDataByDayName).map(([dayName, record]) => {
                return (0, createElement_ts_1.createElement2)(`
          <div class="grid-item header-row">
            <div class="header-text-container">
              <span class="date-name">${dayName}</span>
              <span class="date-number ${record.today ? "today-highlight" : ""}">${record.date}</span>
            </div>
          </div>`);
            });
        }
        else {
            this.dayOfTheWeekElements.forEach((element) => {
                const record = this.dateDataByDayName[element.querySelector(".date-name").textContent];
                const dateELement = element.querySelector(".date-number");
                dateELement.textContent = record.date;
                dateELement.classList[record.today ? "add" : "remove"]("today-highlight");
            });
        }
    }
    updateMonthLabel() {
        this.monthLabel.textContent = this.storage.getMonthOfYear();
    }
    render() {
        this.updateMonthLabel();
        this.updateDateOfWeekElements();
    }
}
exports.default = CalendarHeaderRow;
