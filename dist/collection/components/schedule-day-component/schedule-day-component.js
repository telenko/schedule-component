export class ScheduleDayComponent {
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
    static get style() { return "/**style-placeholder:schedule-day:**/"; }
}
