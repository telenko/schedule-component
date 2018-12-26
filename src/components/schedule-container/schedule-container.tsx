import { Component, Prop } from '@stencil/core';
import { ScheduleEvent } from '../../view/ScheduleEvent';
import { Week } from '../../utils/week';
import { getTime, eventsFromDate } from '../../utils/utils';
import { ScheduleResource } from '../../view/ScheduleResource';

@Component({
    tag: 'schedule-container',
    styleUrl: 'schedule-container.css',
    shadow: true
})
export class ScheduleContainer {

    @Prop()
    events: Array<ScheduleEvent>;

    @Prop()
    date: Date;

    @Prop()
    resources: Array<ScheduleResource>;

    @Prop({attr: 'mode'})
    mode;

    @Prop()
    labels: Labels;

    renderDay() {
        const events = eventsFromDate(this.date, this.events);
        return (
            <schedule-day style={ {height: "700px"} }>
                {this.resources.map(resource => 
                    <schedule-header slot='header'>
                        {resource.name}
                    </schedule-header>
                )}
                {this.resources.map(resource => 
                    <schedule-resource>
                        {events.filter(event => event.resourceId === resource.id).map(event => 
                            <schedule-day-event from={getTime(event.from)} to={getTime(event.to)}>
                                <schedule-event-custom event={event}></schedule-event-custom>
                            </schedule-day-event>
                        )}
                    </schedule-resource>
                )}
            </schedule-day>
            )
    }

    renderWeek() {
        const weekLabels = (this.labels && this.labels.week) || [];
        const week = new Week(this.date);
        week.events = this.events;
        return (
        <schedule-day style={ {height: "700px"} }>
            {weekLabels.map(title => 
                <schedule-header slot='header'>
                    {title}
                </schedule-header>
            )}
            {week.days.map(day => 
                <schedule-resource>
                    {day.events.map(event => 
                        <schedule-day-event from={getTime(event.from)} to={getTime(event.to)}>
                            <schedule-event-custom event={event}></schedule-event-custom>
                        </schedule-day-event>
                    )}
                </schedule-resource>
            )}
        </schedule-day>
        )
    }

    render() {
        const isWeek = !this.mode || this.mode === 'week';
        const isDay = this.mode === 'day';
        return (
            <div>
                {isWeek ? (this.renderWeek()) : ""}
                {isDay ? (this.renderDay()) : ""}
            </div> 
        );
    }
}

export interface Labels {
    week: Array<string>;
}
