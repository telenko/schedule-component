import '../../../dist/types/stencil.core';
import { EventEmitter } from '../../../dist/types/stencil.core';
import { Components } from '../../components';
export declare class ScheduleResourceComponent {
    select: EventEmitter;
    element: HTMLElement;
    readonly board: Components.ScheduleDayBoard;
    readonly schedule: Components.ScheduleDay;
    render(): JSX.Element;
    handleClick(event: MouseEvent): void;
}
