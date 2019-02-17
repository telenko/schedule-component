export class ScheduleResourceComponent {
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
    static get style() { return "/**style-placeholder:schedule-resource:**/"; }
}
