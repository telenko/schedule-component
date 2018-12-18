import { Component, Prop, Element } from '@stencil/core';

import { Components } from '../../components';

@Component({
    tag: 'schedule-day-event',
    styleUrl: 'schedule-day-event.css',
    shadow: true
})
export class ScheduleDayBoardComponent {

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

    @Element()
    element: HTMLElement;

    @Prop({mutable: true, reflectToAttr: true})
    from: string;

    @Prop({mutable: true, reflectToAttr: true})
    to: string;

    boardReady() {
        //todo remove
        this.to = this.element.getAttribute('to');
        this.from = this.element.getAttribute('from');

        const dimension: EventDimension = this.board.getEventDimensions(this.from, this.to);
        this.element.style.top = `${dimension.top}%`;
        this.element.style.height = `${dimension.height}%`;
        this.element.style.position = 'absolute';
    }

    componentDidLoad() {
        if (this.board.isReady) {
            this.boardReady();
            return;
        }
        // @ts-ignore: Unreachable code error
        this.board.addEventListener('ready', () => {
            this.boardReady();
        });
    }

    render() {
        // this.applyStyles();
        return (
            <div class='root'>
                <slot></slot>
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