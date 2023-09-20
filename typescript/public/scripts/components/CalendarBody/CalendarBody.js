"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CalendarEvent_ts_1 = __importDefault(require("../CalendarEvent/CalendarEvent.ts"));
const CalendarHeaderColumn_ts_1 = __importDefault(require("./CalendarDataElements/CalendarHeaderColumn.ts"));
const TimeSlot_ts_1 = __importDefault(require("./CalendarDataElements/TimeSlot.ts"));
const appendElements_ts_1 = __importDefault(require("../../lib/appendElements.ts"));
//todo static class extends "Container"
class CalendarBody {
    calendarHeaderColumnElements;
    storage;
    timeSlotElements = [];
    parentElement = document.getElementById("calendar-body-container");
    timeSlotInstances = [];
    constructor(storage) {
        this.storage = storage;
        const headerColumn = new CalendarHeaderColumn_ts_1.default();
        this.calendarHeaderColumnElements = headerColumn.getElements();
        this.createCalendarBody();
    }
    createCalendarBody() {
        const bodyElements = [];
        this.calendarHeaderColumnElements.forEach((hourOfDayElement, i) => {
            bodyElements.push(hourOfDayElement);
            this.storage.selectedWeek.forEach((dateTime) => {
                const timeSlot = new TimeSlot_ts_1.default(this.storage, dateTime, i);
                const timeSlotElement = timeSlot.getElement();
                bodyElements.push(timeSlotElement);
                this.timeSlotElements.push(timeSlotElement);
            });
        });
        (0, appendElements_ts_1.default)(bodyElements, this.parentElement);
    }
    mapEvents() { }
    updateTimeSlotsData() {
        debugger;
        const week = [...this.storage.selectedWeek];
        this.timeSlotElements.forEach((timeSlotElement) => {
            timeSlotElement.innerHTML = "";
            const [dayNumber, hour] = timeSlotElement.dataset.slotIndex.split("-");
            const dayTimeValue = week[dayNumber]?.setHours(hour, 0, 0);
            timeSlotElement.dataset.dateTime = new Date(dayTimeValue);
            const slotEvents = this.storage.getEventsBySlotIndex(timeSlotElement.dataset.slotIndex);
            if (slotEvents?.length) {
                slotEvents.forEach((slotEvent) => {
                    const timeSlotEvent = new CalendarEvent_ts_1.default(slotEvent, timeSlotElement);
                    timeSlotEvent.render();
                });
            }
        });
    }
    render() {
        this.updateTimeSlotsData();
    }
}
exports.default = CalendarBody;
