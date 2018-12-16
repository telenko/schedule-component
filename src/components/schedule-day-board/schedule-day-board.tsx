import { Component, Prop, Element, Method, EventEmitter, Event } from '@stencil/core';

@Component({
    tag: 'schedule-day-board',
    styleUrl: 'schedule-day-board.css',
    shadow: true
})
export class ScheduleDayBoardComponent {

    @Event()
    ready: EventEmitter;

    @Prop({mutable: true})
    isReady: boolean;

    @Element()
    element;

    @Prop({reflectToAttr: true, mutable: true})
    range: String;

    @Prop({reflectToAttr: true, mutable: true})
    step: Number;

    get timeSlots() : Array<number> {
        if (this.range !== this.slotsRange || !this.slots) {
            this.slots = ScheduleDayBoardComponent.buildTimeSlots(this.range);
            this.slotsRange = this.range;
        }
        return this.slots;
    }

    private slots: Array<number>;
    private slotsRange: String;

    @Method()
    getDateOffset(time: string): DateOffset {
        let splitted = time.split(":");
        const hours: number = +splitted[0];
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
            const minutes: number = +splitted[1];
            if (minutes > 0) {
                offset += gap * minutes / 60;
            }
        }
        return { top: offset };
    }

    @Method()
    getEventDimensions(from: string, to: string): EventDimension {
        let top = this.getDateOffset(from).top;
        return {
            top,
            height: this.getDateOffset(to).top - top
        };
    }

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

    componentDidLoad() {
        this.ready.emit();
        this.isReady = true;
    }

    render() {
        let slotList: Array<number> = this.timeSlots;
        const slotStyle = { height: `${100/slotList.length}%`};
        return (
            <div class='container'>
                {slotList.map((time, index) => 
                    <div class='slot' style={slotStyle}>
                        <div class='time-slot'>{index === 0 ? '' : `${time}:00`}</div>
                        <div class='board-slot'></div>
                    </div>
                )}                
                <slot></slot>
            </div>            
        );
    }

    @Method()
    getTimeLineWidth() {
        return 50;
    }

}

export interface DateOffset {
    top: number
}

export interface EventDimension {
    top: number,
    height: number
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