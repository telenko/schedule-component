import { Component } from '@stencil/core';
// import { ScheduleResource } from '../../view/ScheduleResource';

@Component({
    tag: 'schedule-resource',
    styleUrl: 'schedule-resource.css',
    shadow: true
})
export class ScheduleResourceComponent {

    render() {
        return (
            <div style={ {width: "100%", height: "100%", position: "relative"} }>
                {/* <div class='header'>
                    <slot name='header'></slot>
                </div>              */}
                <slot></slot> 
            </div>
                      
        );
    }

}