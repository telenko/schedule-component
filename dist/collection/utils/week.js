import { getStartWeek, getEndWeek, eventsFromRange, eventsFromDate } from "./utils";
import moment from "moment";
const EVENTS = Symbol("events");
const FROM = Symbol("from");
const TO = Symbol("to");
class Day {
}
export class Week {
    constructor(date) {
        this.days = [new Day(), new Day(), new Day(), new Day(), new Day(), new Day(), new Day()];
        this[FROM] = getStartWeek(date);
        this[TO] = getEndWeek(date);
        this.days.forEach((day, ind) => {
            day.date = moment(this[FROM]).add(ind, 'd').toDate();
        });
    }
    set events(events) {
        this[EVENTS] = eventsFromRange(this[FROM], this[TO], events);
        this.days.forEach(day => {
            day.events = eventsFromDate(day.date, this[EVENTS]);
        });
    }
    get events() {
        return this[EVENTS] || [];
    }
}
