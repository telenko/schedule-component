import '../../stencil.core';
import { Components } from '../../components';
export declare class ScheduleDayEventComponent {
    readonly board: Components.ScheduleDayBoard;
    readonly schedule: Components.ScheduleDay;
    element: HTMLElement;
    from: string;
    to: string;
    boardReady(): void;
    componentDidLoad(): void;
    render(): JSX.Element;
}
export interface DateOffset {
    top: number;
}
export interface EventDimension {
    top: number;
    height: number;
}
