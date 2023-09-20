"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TIME_ZONE_OFFSET = exports.DAYS_ABBREVIATIONS = exports.DAYS = exports.MONTHS_ABBREVIATIONS = exports.MONTHS = void 0;
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat
const MONTHS = [];
exports.MONTHS = MONTHS;
const MONTHS_ABBREVIATIONS = [];
exports.MONTHS_ABBREVIATIONS = MONTHS_ABBREVIATIONS;
const DAYS = [];
exports.DAYS = DAYS;
const DAYS_ABBREVIATIONS = [];
exports.DAYS_ABBREVIATIONS = DAYS_ABBREVIATIONS;
const TIME_ZONE_OFFSET = { 480: "UTC-8", 0: "UTC", 180: "UTC+3" }[Math.abs(new Date().getTimezoneOffset())];
exports.TIME_ZONE_OFFSET = TIME_ZONE_OFFSET;
for (let i = 0; i < 12; i++) {
    const date = new Date(2023, i, 1);
    const monthName = new Intl.DateTimeFormat("en-US", { month: "long" }).format(date);
    const monthAbbreviation = new Intl.DateTimeFormat("en-US", {
        month: "short",
    }).format(date);
    MONTHS.push(monthName);
    MONTHS_ABBREVIATIONS.push(monthAbbreviation);
}
for (let i = 0; i < 7; i++) {
    const date = new Date(2023, 0, i + 1);
    const dayName = new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(date);
    const dayAbbreviation = new Intl.DateTimeFormat("en-US", {
        weekday: "short",
    }).format(date);
    DAYS.push(dayName);
    DAYS_ABBREVIATIONS.push(dayAbbreviation);
}
