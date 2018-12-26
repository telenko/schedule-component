import moment from 'moment';
import { ScheduleEvent } from '../view/ScheduleEvent';

export function format(first: string, middle: string, last: string): string {
  return (
    (first || '') +
    (middle ? ` ${middle}` : '') +
    (last ? ` ${last}` : '')
  );
}

export function getStartWeek(by: Date): Date {
  return moment(by).startOf('isoWeek').toDate();
}

export function getEndWeek(by: Date): Date {
  return moment(by).endOf('isoWeek').toDate();
}

export function eventsFromRange(from: Date, to: Date, events: Array<ScheduleEvent>): Array<ScheduleEvent> {
  return (events || []).filter(event => {
    return event.from >= from && event.to <= to;
  });
}

export function eventsFromDate(date: Date, events: Array<ScheduleEvent>): Array<ScheduleEvent> {
  return events.filter(event => {
    return event.from.getDay() === date.getDay();
  });
}

export function getTime(date: Date): string {
  return moment(date).format("HH:mm");
}

// const startWeek: Date = moment(this.date).startOf('isoWeek').toDate();
// const endWeek: Date = moment(this.date).endOf('isoWeek').toDate();
// filteredEvents = (this.events || []).filter(event => {
//   return event.from >= startWeek && event.to <= endWeek;
// });
// }
// const getDateEvents = (date: Date): Array<ScheduleEvent> => {
//   return filteredEvents.filter(event => {
//     return event.from.getDay() === date.getDay();
//   });
// }

// const timeFromDate = (date: Date): string => {
//   return moment(date).format("HH:mm");
// }


// const week = [
//   {
//     title: "Monday",
//     events: getDateEvents(startWeek)
//   },
//   {
//     title: "Tuesday",
//     events: getDateEvents(moment(startWeek).add(1, 'd').toDate())
//   },
//   {
//     title: "Wednesday",
//     events: getDateEvents(moment(startWeek).add(2, 'd').toDate())
//   },
//   {
//     title: "Thursday",
//     events: getDateEvents(moment(startWeek).add(3, 'd').toDate())
//   },
//   {
//     title: "Friday",
//     events: getDateEvents(moment(startWeek).add(4, 'd').toDate())
//   },
//   {
//     title: "Saturday",
//     events: getDateEvents(moment(startWeek).add(5, 'd').toDate())
//   },
//   {
//     title: "Sunday",
//     events: getDateEvents(moment(startWeek).add(6, 'd').toDate())
//   }
// ];
