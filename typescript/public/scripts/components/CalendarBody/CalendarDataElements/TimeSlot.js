"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CalendarEvent_ts_1 = __importDefault(require("../../CalendarEvent/CalendarEvent.ts"));
const CalendarEventCreationForm_ts_1 = __importDefault(require("../../CalendarEventCreationForm/CalendarEventCreationForm.ts"));
const Modal_ts_1 = __importDefault(require("../../Modal/Modal.ts"));
const createElement_ts_1 = require("../../../lib/createElement.ts");
class TimeSlot {
    slotIndex;
    dateTime;
    timeSlotElement;
    storage;
    constructor(storage, dateTime, startingHour) {
        this.storage = storage;
        this.slotIndex = `${dateTime.getDay()}-${startingHour}`;
        const dateTimeValue = new Date(dateTime).setHours(startingHour, 0, 0);
        this.dateTime = new Date(dateTimeValue);
        this.timeSlotElement = (0, createElement_ts_1.createElement2)(`
        <div 
            class="grid-item time-slot" 
            data-slot-index="${this.slotIndex}" 
            data-date-time="${dateTime}">
        </div>`);
        this.timeSlotElement.addEventListener("click", function (clientEvent) {
            this._renderDraftCalendarEvent();
            Modal_ts_1.default.openCreateEventModal([
                clientEvent.clientX,
                clientEvent.clientY,
            ]);
        }.bind(this));
    }
    _renderDraftCalendarEvent() {
        const draftTimeSlotEvent = new CalendarEvent_ts_1.default({
            stage: "draft",
            title: `(no title), ${this.dateTime.getHours()}`,
            startDateTime: this.dateTime,
            endDateTime: new Date(new Date(this.dateTime).setMinutes(30)),
        }, this.timeSlotElement);
        // !!!!new instance lol duplicated records!!!!!!!!!!!!!
        const form = new CalendarEventCreationForm_ts_1.default(this.storage);
        form.autoFillDates(this.dateTime);
        draftTimeSlotEvent.render();
    }
    update(date) {
        this.timeSlotElement.dataset.dateTime = date;
    }
    getElement() {
        return this.timeSlotElement;
    }
    addEvent(event) { }
}
exports.default = TimeSlot;
