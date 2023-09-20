"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Modal_ts_1 = __importDefault(require("../Modal/Modal.ts"));
const CalendarEvent_ts_1 = __importDefault(require("../CalendarEvent/CalendarEvent.ts"));
const formatDateToDateInputValue_ts_1 = __importDefault(require("../../lib/formatDateToDateInputValue.ts"));
class CalendarEventCreationForm {
    storage;
    calendarEventCreationFormElement = document.querySelector("#event-creation-form");
    constructor(storage) {
        this.storage = storage;
        this.calendarEventCreationFormElement
            .querySelector("#create-event-button")
            .addEventListener("click", this.createEventRecord.bind(this));
    }
    autoFillDates(startDateTime) {
        const startDateTimeField = document.querySelector("#start-datetime");
        startDateTimeField.value = (0, formatDateToDateInputValue_ts_1.default)(startDateTime);
        const endDateTimeField = document.querySelector("#end-datetime");
        endDateTimeField.value = (0, formatDateToDateInputValue_ts_1.default)(new Date(startDateTime).setMinutes(30));
    }
    _eventIsValid(title, startDateTime, endDateTime) {
        const requiredFieldsAreEmpty = !title || !startDateTime || !endDateTime;
        const wrongDateFormat = !startDateTime instanceof Date || !endDateTime instanceof Date;
        if (requiredFieldsAreEmpty)
            throw new Error("Missing required fields");
        if (wrongDateFormat)
            throw new Error("Wrong date format");
        if ((0, formatDateToDateInputValue_ts_1.default)(startDateTime) ===
            (0, formatDateToDateInputValue_ts_1.default)(endDateTime))
            throw new Error("The start date cannot be equal to the end date");
        if (startDateTime > endDateTime)
            throw new Error("The start date cannot be greater than end date");
        return true;
    }
    createEventRecord() {
        // remove draft events.
        const title = document.querySelector("#event-title").value;
        const startDateTime = new Date(document.querySelector("#start-datetime").value);
        const endDateTime = new Date(document.querySelector("#end-datetime").value);
        const description = document.querySelector("#event-description").value;
        if (this._eventIsValid(title, startDateTime, endDateTime)) {
            const eventRecord = {
                title,
                startDateTime,
                endDateTime,
                description,
                stage: "upcoming",
            };
            const timeSlotEvent = new CalendarEvent_ts_1.default(eventRecord);
            timeSlotEvent.render();
            Modal_ts_1.default.closeCreateEventModal();
            this.storage.saveEvent(eventRecord);
        }
    }
}
exports.default = CalendarEventCreationForm;
