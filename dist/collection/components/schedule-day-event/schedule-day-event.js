export class ScheduleDayBoardComponent {
    get board() {
        let item = this.schedule.shadowRoot.querySelector("schedule-day-board");
        return item;
    }
    get schedule() {
        let parent = this.element.closest('schedule-day');
        return parent;
    }
    boardReady() {
        this.to = this.to || this.element.getAttribute('to');
        this.from = this.from || this.element.getAttribute('from');
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
        this.board.addEventListener('ready', () => {
            this.boardReady();
        });
    }
    render() {
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
