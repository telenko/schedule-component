import '../../stencil.core';
import { EventEmitter } from '../../stencil.core';
import { Components } from '../../components';
export declare class ScheduleResourceComponent {
    select: EventEmitter;
    element: HTMLElement;
    readonly board: Components.ScheduleDayBoard;
    readonly schedule: Components.ScheduleDay;
    render(): JSX.Element;
    handleClick(event: MouseEvent): void;
}
export interface SelectCallback {
    time: string;
}
