import { ScheduleEvent } from '../view/ScheduleEvent';
export declare function format(first: string, middle: string, last: string): string;
export declare function getStartWeek(by: Date): Date;
export declare function getEndWeek(by: Date): Date;
export declare function eventsFromRange(from: Date, to: Date, events: Array<ScheduleEvent>): Array<ScheduleEvent>;
export declare function eventsFromDate(date: Date, events: Array<ScheduleEvent>): Array<ScheduleEvent>;
export declare function getTime(date: Date): string;
