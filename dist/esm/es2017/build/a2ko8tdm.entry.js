/*! Built with http://stenciljs.com */
import { h } from '../scheduler.core.js';

class ScheduleDayComponent {
    componentDidLoad() {
        this.onSlotChange();
        this.element.shadowRoot.querySelector("slot[data-events]").addEventListener("slotchange", () => {
            this.onSlotChange();
        });
        this.onHeaderChange();
        this.element.shadowRoot.querySelector("slot[name='header']").addEventListener("slotchange", () => {
            this.onHeaderChange();
        });
    }
    render() {
        return (h("div", { class: 'root', style: { width: "100%", height: "100%" } },
            h("div", { class: 'header-container' },
                h("slot", { name: 'header' })),
            h("div", { class: 'container', style: { position: "relative" } },
                h("schedule-day-board", { range: "6-22" }),
                h("slot", { "data-events": true }))));
    }
    onHeaderChange() {
        let headers = this.element.querySelectorAll('schedule-header[slot="header"]');
        if (!headers.length) {
            return;
        }
        headers.forEach((header, index) => {
            header.style.width = `${100 / headers.length}%`;
            header.style.left = `${index * 100 / headers.length}%`;
        });
    }
    onSlotChange() {
        let resources = this.element.querySelectorAll('schedule-resource');
        if (!resources.length) {
            return;
        }
        resources.forEach((resource, index) => {
            resource.style.width = `${100 / resources.length}%`;
            resource.style.left = `${index * 100 / resources.length}%`;
        });
    }
    static get is() { return "schedule-day"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "element": {
            "elementRef": true
        },
        "resources": {
            "type": "Any",
            "attr": "resources"
        }
    }; }
    static get style() { return ":host{-webkit-box-sizing:border-box;box-sizing:border-box;--timeline-width:45px;--schedule-border-color:hsla(0,0%,47.1%,0.2)}.container{height:100%}.container,.root{display:-ms-flexbox;display:flex}.root{-ms-flex-direction:column;flex-direction:column}.resource-header-cont{margin-left:42px;display:-ms-flexbox;display:flex}.header{text-align:center}.header:not(:last-child){border-right:1px solid var(--schedule-border-color,hsla(0,0%,47.1%,.7))}schedule-timeline{border-top:1px solid var(--schedule-border-color,hsla(0,0%,47.1%,.7))}:host{display:block;border:1px solid var(--schedule-border-color,hsla(0,0%,47.1%,.7));padding-left:var(--timeline-width)}schedule-day-board{border-top:1px solid var(--schedule-border-color,hsla(0,0%,47.1%,.7));margin-left:calc(var(--timeline-width) * -1);height:100%;width:calc(100% + var(--timeline-width));-webkit-box-sizing:border-box;box-sizing:border-box}::slotted(schedule-header:not(:last-of-type)),::slotted(schedule-resource:not(:last-of-type)){border-right:1px solid var(--schedule-border-color,hsla(0,0%,47.1%,.7))}::slotted(schedule-header:first-of-type),::slotted(schedule-resource:first-of-type){border-left:1px solid var(--schedule-border-color,hsla(0,0%,47.1%,.7))}::slotted(schedule-header){display:inline-block;-webkit-box-sizing:border-box;box-sizing:border-box}"; }
}

class ScheduleDayBoardComponent {
    get timeSlots() {
        if (this.range !== this.slotsRange || !this.slots) {
            this.slots = ScheduleDayBoardComponent.buildTimeSlots(this.range);
            this.slotsRange = this.range;
        }
        return this.slots;
    }
    getDateOffset(time) {
        let splitted = time.split(":");
        const hours = +splitted[0];
        let gap = 100 / (this.timeSlots.length);
        let gapsBefore = hours - this.timeSlots[0];
        const resp = gap * gapsBefore;
        let offset;
        if (resp < 0) {
            offset = 0;
        }
        else if (resp > 100) {
            offset = 100;
        }
        else {
            offset = resp;
            const minutes = +splitted[1];
            if (minutes > 0) {
                offset += gap * minutes / 60;
            }
        }
        return { top: offset };
    }
    getEventDimensions(from, to) {
        let top = this.getDateOffset(from).top;
        return {
            top,
            height: this.getDateOffset(to).top - top
        };
    }
    getTimeByOffset(topPercentage) {
        const minutes = 24 * 60 * topPercentage;
        const hours = minutes / 60;
        return { hours: Math.trunc(hours), minutes: Math.trunc(minutes - (hours * 60)) };
    }
    static buildTimeSlots(fromRange) {
        if (!fromRange) {
            return [];
        }
        const ranges = fromRange.split("-");
        const from = Number(ranges[0]);
        const to = Number(ranges[1]);
        let resp = [];
        for (let i = from; i <= to; i++) {
            resp.push(i);
        }
        return resp;
    }
    componentDidLoad() {
        this.ready.emit();
        this.isReady = true;
    }
    render() {
        let slotList = this.timeSlots;
        const slotStyle = { height: `${100 / slotList.length}%` };
        return (h("div", { class: 'container' },
            slotList.map((time, index) => h("div", { class: 'slot', style: slotStyle },
                h("div", { class: 'time-slot' }, index === 0 ? '' : `${time}:00`),
                h("div", { class: 'board-slot' }))),
            h("slot", null)));
    }
    static get is() { return "schedule-day-board"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "element": {
            "elementRef": true
        },
        "getDateOffset": {
            "method": true
        },
        "getEventDimensions": {
            "method": true
        },
        "getTimeByOffset": {
            "method": true
        },
        "isReady": {
            "type": Boolean,
            "attr": "is-ready",
            "mutable": true
        },
        "range": {
            "type": "Any",
            "attr": "range",
            "reflectToAttr": true,
            "mutable": true
        },
        "step": {
            "type": "Any",
            "attr": "step",
            "reflectToAttr": true,
            "mutable": true
        }
    }; }
    static get events() { return [{
            "name": "ready",
            "method": "ready",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get style() { return ".container{width:100%;height:100%}:host{display:inline-block}.slot:not(:last-of-type) .board-slot{border-bottom:1px solid var(--schedule-border-color,hsla(0,0%,47.1%,.7));-webkit-box-sizing:border-box;box-sizing:border-box}.slot{position:relative}.time-slot{height:100%;display:inline-block;width:var(--timeline-width);text-align:center;top:-9px;position:absolute;color:hsla(0,0%,47.1%,.8);font-family:Arial;font-size:14px}.board-slot{float:right;height:100%;width:calc(100% - var(--timeline-width))}"; }
}

export { ScheduleDayComponent as ScheduleDay, ScheduleDayBoardComponent as ScheduleDayBoard };
