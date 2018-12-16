import { Component, Prop, Method, Element } from '@stencil/core';
import { ScheduleEvent } from '../../view/ScheduleEvent';

@Component({
    tag: 'schedule-timeline',
    styleUrl: 'timeline-component.css',
    shadow: true
})
export class TimeLineComponent {

    @Element()
    element;

    @Prop({reflectToAttr: true, mutable: true})
    range: String;

    timeSlots: Array<number>;

    static buildTimeSlots(fromRange: String): Array<number> {
        if (!fromRange) {
            return [];
        }
        const ranges = fromRange.split("-");
        const from: number = Number(ranges[0]);
        const to: number = Number(ranges[1]);
        let resp = [];
        for (let i: number = from; i <= to; i++) {
            resp.push(i);
        }
        return resp;
    }

    private buildTimeSlots(): Array<number> {
        return TimeLineComponent.buildTimeSlots(this.range);
    }

    @Method()
    getDateOffset(date: Date): DateOffset {
        const hours: number = date.getHours();
        let gap: number = 100 / (this.timeSlots.length);
        let gapsBefore: number = hours - this.timeSlots[0];

        const resp = gap * gapsBefore;
        let offset: number;
        if (resp < 0 ) {
            offset = 0;
        } else if (resp > 100) {
            offset = 100;
        } else {
            offset = resp;
            const minutes: number = date.getMinutes();
            if (minutes > 0) {
                offset += gap * minutes / 60;
            }
        }
        return { top: offset };
    }

    @Method()
    getEventDimensions(event: ScheduleEvent): EventDimension {
        let top = this.getDateOffset(event.from).top;
        return {
            top,
            height: this.getDateOffset(event.to).top - top
        };
    }

    @Method()
    getWidth() {
        return `50px`;//TODO
    }

    render() {
        let timeSlots: Array<number> = this.timeSlots = this.buildTimeSlots();
        const slotStyle = { height: `${100/timeSlots.length}%`};
        return (
            <div class='timeslot-container'>
                {timeSlots.map(time => 
                <div class='timeslot-item' data-time={time} style={slotStyle}>{time}:00</div>
                )}
            </div>
        );
    }

}

export interface DateOffset {
    top: number
}

export interface EventDimension {
    top: number,
    height: number
}