"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../constants/index");
const mapRange_1 = __importDefault(require("../lib/mapRange"));
class StorageService {
    selectedWeek = [];
    static instance = null;
    constructor() {
        window.addEventListener("beforeunload", () => {
            sessionStorage.clear();
        });
        this.setSelectedWeek(new Date(), 0);
        sessionStorage.setItem("cachedWeeks", JSON.stringify([]));
    }
    _getEvents() {
        if (!localStorage.length) {
            localStorage.setItem("events", "{}");
        }
        return JSON.parse(localStorage.getItem("events") || "{}");
    }
    saveEvent(event) {
        const events = this._getEvents();
        const slotIndex = `${event.startDateTime.getDay()}-${event.startDateTime.getHours()}`;
        const eventsOfTheSlot = events[slotIndex] || [];
        event.id = String(Object.values(events).flat().length +
            Math.random() * 10000 +
            new Date().getSeconds()).replace(".", "");
        eventsOfTheSlot.push(event);
        localStorage.setItem("events", JSON.stringify({ ...events, [slotIndex]: eventsOfTheSlot }));
    }
    getEventsBySlotIndex(slotIndex) {
        const events = this._getEvents();
        const eventsOfTheSlot = events[slotIndex];
        if (!eventsOfTheSlot?.length)
            return [];
        const timeSlotDayTime = new Date(document.querySelector(`[data-slot-index="${slotIndex}"]`)?.dataset.dateTime || "");
        return eventsOfTheSlot.filter((event) => {
            const eventDate = new Date(event.startDateTime);
            return (eventDate.getHours() === timeSlotDayTime.getHours() &&
                eventDate.getDate() === timeSlotDayTime.getDate());
        });
    }
    deleteEventById(targetId) {
        localStorage.setItem("events", JSON.stringify(Object.fromEntries(Object.entries(this._getEvents()).map(([key, itsEvents]) => {
            return [key, itsEvents.filter((event) => event.id !== targetId)];
        }))));
    }
    getMonthOfYear() {
        const referenceSunday = this.selectedWeek[0];
        return `${index_1.MONTHS[referenceSunday.getMonth()]} ${referenceSunday.getFullYear()}`;
    }
    cachWeek(week, index) {
        const cachedWeeks = JSON.parse(sessionStorage.getItem("cachedWeeks") || "[]");
        cachedWeeks[index] = week;
        sessionStorage.setItem("cachedWeeks", JSON.stringify(cachedWeeks, null, 2));
    }
    setSelectedWeek(date, index) {
        const cachedWeeks = JSON.parse(sessionStorage.getItem("cachedWeeks") || "[]").map((dateTimeString) => new Date(dateTimeString));
        if (cachedWeeks && cachedWeeks[index]?.length) {
            const cachedWeek = cachedWeeks[index];
            this.selectedWeek = cachedWeek;
            return this.selectedWeek;
        }
        const startDate = new Date(date.setDate(date.getDate() - date.getDay()));
        const week = (0, mapRange_1.default)(0, 7, (dayNumber) => {
            const currentDate = new Date(startDate);
            currentDate.setDate(startDate.getDate() + dayNumber);
            return currentDate;
        });
        if (week && week.length > 0) {
            this.cachWeek(week, index);
            this.selectedWeek = week;
        }
        else {
            throw new Error("Week error");
        }
    }
    getSelectedWeek() {
        return this.selectedWeek;
    }
    static getInstance() {
        if (!StorageService.instance) {
            StorageService.instance = new StorageService();
        }
        return StorageService.instance;
    }
}
exports.default = StorageService.getInstance();
