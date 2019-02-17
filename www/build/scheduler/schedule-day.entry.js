const h = window.scheduler.h;

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
    static get style() { return ":host {\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n    --timeline-width: 45px;\n    --schedule-border-color: rgba(120,120,120,0.2);\n}\n\n.container {\n    display: -ms-flexbox;\n    display: flex;\n    height: 100%;\n}\n.root {\n    display: -ms-flexbox;\n    display: flex;\n    -ms-flex-direction: column;\n    flex-direction: column;\n}\n.resource-header-cont {\n    margin-left: 42px;\n    display: -ms-flexbox;\n    display: flex;\n}\n.header {\n    text-align: center;\n}\n.header:not(:last-child) {\n    border-right: 1px solid var(--schedule-border-color, rgba(120, 120, 120, 0.7));\n}\nschedule-timeline {\n    border-top: 1px solid var(--schedule-border-color, rgba(120, 120, 120, 0.7));\n}\n:host {\n    display: block;\n    border: 1px solid var(--schedule-border-color, rgba(120, 120, 120, 0.7));\n    padding-left: var(--timeline-width);\n}\n/* .header-container {\n    border-bottom: 1px solid var(--schedule-border-color, rgba(120, 120, 120, 0.7));\n} */\nschedule-day-board {\n    border-top: 1px solid var(--schedule-border-color, rgba(120, 120, 120, 0.7));\n    margin-left: calc(var(--timeline-width) * -1);\n    height: 100%;\n    width: calc(100% + var(--timeline-width));\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n}\n\n\n::slotted(schedule-resource:not(:last-of-type)), ::slotted(schedule-header:not(:last-of-type)) {\n    border-right: 1px solid var(--schedule-border-color, rgba(120, 120, 120, 0.7));\n}\n::slotted(schedule-resource:first-of-type), ::slotted(schedule-header:first-of-type) {\n    border-left: 1px solid var(--schedule-border-color, rgba(120, 120, 120, 0.7));\n}\n::slotted(schedule-header) {\n    display: inline-block;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n}"; }
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
    static get style() { return ".container {\n    width: 100%;\n    height: 100%;\n}\n:host {\n    display: inline-block;\n}\n.slot:not(:last-of-type) .board-slot {\n    border-bottom: 1px solid var(--schedule-border-color, rgba(120, 120, 120, 0.7));;\n    -webkit-box-sizing: border-box;;\n    box-sizing: border-box;\n}\n.slot {\n    position: relative;\n}\n.time-slot {\n    height: 100%;\n    display: inline-block;\n    width: var(--timeline-width);\n    text-align: center;\n    top: -9px;\n    position: absolute;\n\n    color: rgba(120,120,120,0.8);\n    font-family: Arial;\n    font-size: 14px;\n}\n.board-slot {\n    float: right;\n    height: 100%;\n    width: calc(100% - var(--timeline-width));\n}"; }
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

class ScheduleDayEventComponent {
    get board() {
        // @ts-ignore: Unreachable code error
        let item = this.schedule.shadowRoot.querySelector("schedule-day-board");
        return item;
    }
    get schedule() {
        let parent = this.element.closest('schedule-day');
        // @ts-ignore: Unreachable code error
        return parent;
    }
    boardReady() {
        const dimension = this.board.getEventDimensions(this.from, this.to);
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
        return (h("div", { class: 'root' },
            h("slot", null)));
    }
    static get is() { return "schedule-day-event"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "element": {
            "elementRef": true
        },
        "from": {
            "type": String,
            "attr": "from",
            "reflectToAttr": true,
            "mutable": true
        },
        "to": {
            "type": String,
            "attr": "to",
            "reflectToAttr": true,
            "mutable": true
        }
    }; }
    static get style() { return ".root {\n    height: 100%;\n}\n::slotted(*) {\n    height: 100%;\n}"; }
}

class ScheduleResourceComponent {
    get board() {
        // @ts-ignore: Unreachable code error
        let item = this.schedule.shadowRoot.querySelector("schedule-day-board");
        return item;
    }
    get schedule() {
        let parent = this.element.closest('schedule-day');
        // @ts-ignore: Unreachable code error
        return parent;
    }
    render() {
        return (h("div", { style: { width: "100%", height: "100%", position: "relative" }, onClick: e => this.handleClick(e) },
            h("slot", null)));
    }
    handleClick(event) {
        const { top, height } = this.element.getBoundingClientRect();
        const percentage = (event.clientY - top) / height;
        this.board.getTimeByOffset(percentage);
        const minutes = 24 * 60 * percentage;
        const hours = minutes / 60;
        const resp = `${Math.trunc(hours)}:${Math.trunc(minutes - (hours * 60))}`;
        console.log(resp);
        debugger;
    }
    static get is() { return "schedule-resource"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "element": {
            "elementRef": true
        }
    }; }
    static get events() { return [{
            "name": "select",
            "method": "select",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get style() { return ":host {\n    height: 100%;\n    position: absolute;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n}\n::slotted(schedule-day-event) {\n    width: calc(100% - 20px);\n    margin-left: 10px;\n}\n.header {\n    width: 100%;\n    position: absolute;\n    top: calc(var(--header-height) * -1);\n    \n    border-right: 1px solid var(--schedule-border-color, rgba(120, 120, 120, 0.7));\n    height: var(--header-height);\n}"; }
}

export { ScheduleDayComponent as ScheduleDay, ScheduleDayBoardComponent as ScheduleDayBoard, ScheduleDayEventComponent as ScheduleDayEvent, ScheduleResourceComponent as ScheduleResource };
