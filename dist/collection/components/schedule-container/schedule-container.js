import { Week } from '../../utils/week';
import { getTime, eventsFromDate } from '../../utils/utils';
export class ScheduleContainer {
    renderDay() {
        const events = eventsFromDate(this.date, this.events);
        return (h("schedule-day", { style: { height: "700px" } },
            this.resources.map(resource => h("schedule-header", { slot: 'header' }, resource.name)),
            this.resources.map(resource => h("schedule-resource", null, events.filter(event => event.resourceId === resource.id).map(event => h("schedule-day-event", { from: getTime(event.from), to: getTime(event.to) },
                h("schedule-event-custom", { event: event })))))));
    }
    renderWeek() {
        const weekLabels = (this.labels && this.labels.week) || [];
        const week = new Week(this.date);
        week.events = this.events;
        return (h("schedule-day", { style: { height: "700px" } },
            weekLabels.map(title => h("schedule-header", { slot: 'header' }, title)),
            week.days.map(day => h("schedule-resource", null, day.events.map(event => h("schedule-day-event", { from: getTime(event.from), to: getTime(event.to) },
                h("schedule-event-custom", { event: event })))))));
    }
    render() {
        const isWeek = !this.mode || this.mode === 'week';
        const isDay = this.mode === 'day';
        return (h("div", null,
            isWeek ? (this.renderWeek()) : "",
            isDay ? (this.renderDay()) : ""));
    }
    static get is() { return "schedule-container"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "date": {
            "type": "Any",
            "attr": "date"
        },
        "events": {
            "type": "Any",
            "attr": "events"
        },
        "labels": {
            "type": "Any",
            "attr": "labels"
        },
        "mode": {
            "type": "Any",
            "attr": "mode"
        },
        "resources": {
            "type": "Any",
            "attr": "resources"
        }
    }; }
    static get style() { return "/**style-placeholder:schedule-container:**/"; }
}
