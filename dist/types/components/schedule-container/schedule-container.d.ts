import '../../stencil.core';
import { ScheduleEvent } from '../../view/ScheduleEvent';
import { ScheduleResource } from '../../view/ScheduleResource';
export declare class ScheduleContainer {
    events: Array<ScheduleEvent>;
    date: Date;
    resources: Array<ScheduleResource>;
    mode: any;
    labels: Labels;
    renderDay(): JSX.Element;
    renderWeek(): JSX.Element;
    render(): JSX.Element;
}
export interface Labels {
    week: Array<string>;
}
