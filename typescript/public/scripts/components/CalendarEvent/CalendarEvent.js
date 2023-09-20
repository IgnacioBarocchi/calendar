"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Modal_ts_1 = __importDefault(require("../Modal/Modal.ts"));
// todo: refactor!
const appendElements_ts_1 = __importDefault(require("../../lib/appendElements.ts"));
const createElement_ts_1 = require("../../lib/createElement.ts");
class CalendarEvent {
    calendarEvent;
    timeSlot;
    constructor(calendarEvent, timeSlot) {
        this.calendarEvent = calendarEvent;
        this.timeSlot = timeSlot;
    }
    _getEventHoursLong(startDateTime, endDateTime) {
        return Math.abs(startDateTime - endDateTime) / 36e5;
    }
    _processEvents() {
        const { stage } = this.calendarEvent || {};
        if (stage === "draft") {
            this.calendarEventElement.classList.add("draft");
            return this.calendarEventElement;
        }
        this.calendarEventElement.addEventListener("click", function (clientEvent) {
            // alert("event! " + clientEvent);
            clientEvent.stopPropagation();
            Modal_ts_1.default.showEventDetails(this.calendarEventElement, [
                clientEvent.clientX,
                clientEvent.clientY,
            ]);
        }.bind(this));
        return this.calendarEventElement;
    }
    render() {
        const { stage, title, startDateTime: startDateTimeString, endDateTime: endDateTimeString, description, } = this.calendarEvent || {};
        const classNameByEventStage = {
            upcoming: "time-slot-event-upcoming",
            ongoing: "time-slot-event-ongoing",
            past: "time-slot-event-past",
            draft: "time-slot-event-draft",
        }[stage];
        const startDateTime = new Date(startDateTimeString);
        const endDateTime = new Date(endDateTimeString);
        const eventHoursLong = this._getEventHoursLong(startDateTime, endDateTime);
        if (!this.timeSlot) {
            this.timeSlot = document.querySelector(`[data-slot-index="${startDateTime.getDay()}-${startDateTime.getHours()}"]`);
        }
        const pixelUnitsOfOneHourSlot = this.timeSlot.offsetHeight;
        const calendarEventOffsetHeight = `${pixelUnitsOfOneHourSlot * eventHoursLong}`;
        this.calendarEventElement = (0, createElement_ts_1.createElement2)(`
        <div class="${classNameByEventStage}" style="height: ${calendarEventOffsetHeight}px; top:${startDateTime.getMinutes()}px" data-calendar-event='${JSON.stringify(this.calendarEvent)}'>
            <h3>${title}</h3>
            <div>${startDateTime.toLocaleString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
        })} - ${endDateTime.toLocaleString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
        })}</div>
      ${description ? `<div>${description}</div>` : ""}
        </div>
      `);
        (0, appendElements_ts_1.default)([this._processEvents()], this.timeSlot);
        return this.calendarEventElement;
    }
}
exports.default = CalendarEvent;
