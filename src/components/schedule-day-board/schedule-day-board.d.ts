import '../../../dist/types/stencil.core';
import { EventEmitter } from '../../../dist/types/stencil.core';
export declare class ScheduleDayBoardComponent {
    ready: EventEmitter;
    isReady: boolean;
    element: any;
    range: String;
    step: Number;
    readonly timeSlots: Array<number>;
    private slots;
    private slotsRange;
    getDateOffset(time: string): DateOffset;
    getEventDimensions(from: string, to: string): EventDimension;
    getTimeByOffset(topPercentage: number): Time;
    static buildTimeSlots(fromRange: String): Array<number>;
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
export interface Time {
    hours: number;
    minutes: number;
}
/**
 * <schedule-day>
 *
 *   <schedule-resource id='1'>
 *       <schedule-event from="17.00" to="19.34">
 *           <div>inner content</div>
 *       </schedule-event>
 *   </schedule-resource>
 *
 * </schedule-day>
 *
 * renderEvent(event) {
 *    return <>
 * }
 */ 
