export class ScheduleDayEventComponent {
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
    static get style() { return "/**style-placeholder:schedule-day-event:**/"; }
}
