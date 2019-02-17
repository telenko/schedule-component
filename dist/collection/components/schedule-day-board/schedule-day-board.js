export class ScheduleDayBoardComponent {
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
    static get style() { return "/**style-placeholder:schedule-day-board:**/"; }
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
