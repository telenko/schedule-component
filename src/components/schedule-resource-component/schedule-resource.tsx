import { Component, Event, EventEmitter, Element } from '@stencil/core';
import { Components } from '../../components';


@Component({
    tag: 'schedule-resource',
    styleUrl: 'schedule-resource.css',
    shadow: true
})
export class ScheduleResourceComponent {

    @Event()
    select: EventEmitter;

    @Element()
    element:HTMLElement;

    get board(): Components.ScheduleDayBoard {
        // @ts-ignore: Unreachable code error
        let item = this.schedule.shadowRoot.querySelector("schedule-day-board");
        return item as Components.ScheduleDayBoard;
    }

    get schedule(): Components.ScheduleDay {
        let parent = this.element.closest('schedule-day');
        // @ts-ignore: Unreachable code error
        return parent as Components.ScheduleDay;
    }

    // boardReady() {
        
    // }

    // componentDidLoad() {
    //     if (this.board.isReady) {
    //         this.boardReady();
    //         return;
    //     }
    //     // @ts-ignore: Unreachable code error
    //     this.board.addEventListener('ready', () => {
    //         this.boardReady();
    //     });
    // }

    render() {
        return (
            <div style={ {width: "100%", height: "100%", position: "relative"} } onClick={e => this.handleClick(e)}>
                <slot></slot> 
            </div>
                      
        );
    }

    handleClick(event:MouseEvent) {
        const { top, height } = this.element.getBoundingClientRect();
        const percentage = (event.clientY - top) / height;
        const minutes = 24 * 60 * percentage;
        const hours = minutes / 60;
        const resp = `${Math.trunc(hours)}:${Math.trunc(minutes - (hours * 60))}`;
        console.log(resp);
        debugger;
    }

}

export interface SelectCallback {
    time: string;
}