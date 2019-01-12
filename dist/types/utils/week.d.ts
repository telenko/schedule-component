import { ScheduleEvent } from "../view/ScheduleEvent";
declare class Day {
    events: Array<ScheduleEvent>;
    date: Date;
}
export declare class Week {
    constructor(date: Date);
    days: Array<Day>;
    events: Array<ScheduleEvent>;
}
export {};
