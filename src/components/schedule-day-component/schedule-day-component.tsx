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
        this.element.shadowRoot.querySelector("slot").addEventListener("slotchange", () => {
            this.onSlotChange();
        });
    }

    render() {
        // let resources = this.resources || [];
        // const timelineWidth = 
        
        // const count = this.getTimeSlotsLength();
        return (
            <div style={ {width: "100%", height: "100%"} }>                
                <div class='container' style={ {position: "relative", height: "100%"} }>
                    <schedule-day-board range="6-22"></schedule-day-board>
                    <slot></slot>
                </div>  
            </div>
                      
        );
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