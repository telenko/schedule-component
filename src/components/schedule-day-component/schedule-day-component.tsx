import { Component, Prop, Element } from '@stencil/core';
import { ScheduleResource } from '../../view/ScheduleResource';

@Component({
    tag: 'schedule-day',
    styleUrl: 'schedule-day-component.css',
    shadow: true
})
export class ScheduleDayComponent {

    @Element()
    element;

    // @Prop()
    // day: Date;//?

    @Prop()
    resources: Array<ScheduleResource>;

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
        return (
            <div class='root' style={ {width: "100%", height: "100%"} }>  
                <div class='header-container'><slot name='header'></slot></div>              
                <div class='container' style={ {position: "relative"} }>
                    <schedule-day-board range="6-22"></schedule-day-board>
                    <slot data-events></slot>
                </div>  
            </div>
                      
        );
    }

    onHeaderChange() {
        let headers = this.element.querySelectorAll('schedule-header[slot="header"]');
        if (!headers.length) {
            return;
        }
        headers.forEach((header, index) => {
            header.style.width = `${100/headers.length}%`;
            header.style.left = `${index*100/headers.length}%`;
        });
    }

    onSlotChange() {
        let resources = this.element.querySelectorAll('schedule-resource');
        if (!resources.length) {
            return;
        }
        resources.forEach((resource, index) => {
            resource.style.width = `${100/resources.length}%`;
            resource.style.left = `${index*100/resources.length}%`;
        });
    }

}