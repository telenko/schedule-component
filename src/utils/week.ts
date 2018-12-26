import { ScheduleEvent } from "../view/ScheduleEvent";
import { getStartWeek, getEndWeek, eventsFromRange, eventsFromDate } from "./utils";
import moment from "moment";

const EVENTS = Symbol("events");
const FROM = Symbol("from");
const TO = Symbol("to");

class Day {

    events: Array<ScheduleEvent>;

    date: Date;

}
export class Week {

  constructor(date: Date) {
      this[FROM] = getStartWeek(date);
      this[TO] = getEndWeek(date);
     
      this.days.forEach((day, ind) => {
          day.date = moment(this[FROM]).add(ind, 'd').toDate();
      });
  }

  days: Array<Day> = [new Day(), new Day(), new Day(), new Day(), new Day(), new Day(), new Day()]

  set events(events: Array<ScheduleEvent>) {
    this[EVENTS] = eventsFromRange(this[FROM], this[TO], events);
    this.days.forEach(day => {
        day.events = eventsFromDate(day.date, this[EVENTS]);
    });
  }

  get events(): Array<ScheduleEvent> {
      return this[EVENTS] || [];
  }

}