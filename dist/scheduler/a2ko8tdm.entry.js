/*! Built with http://stenciljs.com */
const{h:e}=window.scheduler;class t{componentDidLoad(){this.onSlotChange(),this.element.shadowRoot.querySelector("slot[data-events]").addEventListener("slotchange",()=>{this.onSlotChange()}),this.onHeaderChange(),this.element.shadowRoot.querySelector("slot[name='header']").addEventListener("slotchange",()=>{this.onHeaderChange()})}render(){return e("div",{class:"root",style:{width:"100%",height:"100%"}},e("div",{class:"header-container"},e("slot",{name:"header"})),e("div",{class:"container",style:{position:"relative"}},e("schedule-day-board",{range:"6-22"}),e("slot",{"data-events":!0})))}onHeaderChange(){let e=this.element.querySelectorAll('schedule-header[slot="header"]');e.length&&e.forEach((t,s)=>{t.style.width=`${100/e.length}%`,t.style.left=`${100*s/e.length}%`})}onSlotChange(){let e=this.element.querySelectorAll("schedule-resource");e.length&&e.forEach((t,s)=>{t.style.width=`${100/e.length}%`,t.style.left=`${100*s/e.length}%`})}static get is(){return"schedule-day"}static get encapsulation(){return"shadow"}static get properties(){return{element:{elementRef:!0},resources:{type:"Any",attr:"resources"}}}static get style(){return":host{-webkit-box-sizing:border-box;box-sizing:border-box;--timeline-width:45px;--schedule-border-color:hsla(0,0%,47.1%,0.2)}.container{height:100%}.container,.root{display:-ms-flexbox;display:flex}.root{-ms-flex-direction:column;flex-direction:column}.resource-header-cont{margin-left:42px;display:-ms-flexbox;display:flex}.header{text-align:center}.header:not(:last-child){border-right:1px solid var(--schedule-border-color,hsla(0,0%,47.1%,.7))}schedule-timeline{border-top:1px solid var(--schedule-border-color,hsla(0,0%,47.1%,.7))}:host{display:block;border:1px solid var(--schedule-border-color,hsla(0,0%,47.1%,.7));padding-left:var(--timeline-width)}schedule-day-board{border-top:1px solid var(--schedule-border-color,hsla(0,0%,47.1%,.7));margin-left:calc(var(--timeline-width) * -1);height:100%;width:calc(100% + var(--timeline-width));-webkit-box-sizing:border-box;box-sizing:border-box}::slotted(schedule-header:not(:last-of-type)),::slotted(schedule-resource:not(:last-of-type)){border-right:1px solid var(--schedule-border-color,hsla(0,0%,47.1%,.7))}::slotted(schedule-header:first-of-type),::slotted(schedule-resource:first-of-type){border-left:1px solid var(--schedule-border-color,hsla(0,0%,47.1%,.7))}::slotted(schedule-header){display:inline-block;-webkit-box-sizing:border-box;box-sizing:border-box}"}}class s{get timeSlots(){return this.range===this.slotsRange&&this.slots||(this.slots=s.buildTimeSlots(this.range),this.slotsRange=this.range),this.slots}getDateOffset(e){let t=e.split(":"),s=100/this.timeSlots.length;const l=s*(+t[0]-this.timeSlots[0]);let a;if(l<0)a=0;else if(l>100)a=100;else{a=l;const e=+t[1];e>0&&(a+=s*e/60)}return{top:a}}getEventDimensions(e,t){let s=this.getDateOffset(e).top;return{top:s,height:this.getDateOffset(t).top-s}}getTimeByOffset(e){const t=1440*e,s=t/60;return{hours:Math.trunc(s),minutes:Math.trunc(t-60*s)}}static buildTimeSlots(e){if(!e)return[];const t=e.split("-"),s=Number(t[0]),l=Number(t[1]);let a=[];for(let e=s;e<=l;e++)a.push(e);return a}componentDidLoad(){this.ready.emit(),this.isReady=!0}render(){let t=this.timeSlots;const s={height:`${100/t.length}%`};return e("div",{class:"container"},t.map((t,l)=>e("div",{class:"slot",style:s},e("div",{class:"time-slot"},0===l?"":`${t}:00`),e("div",{class:"board-slot"}))),e("slot",null))}static get is(){return"schedule-day-board"}static get encapsulation(){return"shadow"}static get properties(){return{element:{elementRef:!0},getDateOffset:{method:!0},getEventDimensions:{method:!0},getTimeByOffset:{method:!0},isReady:{type:Boolean,attr:"is-ready",mutable:!0},range:{type:"Any",attr:"range",reflectToAttr:!0,mutable:!0},step:{type:"Any",attr:"step",reflectToAttr:!0,mutable:!0}}}static get events(){return[{name:"ready",method:"ready",bubbles:!0,cancelable:!0,composed:!0}]}static get style(){return".container{width:100%;height:100%}:host{display:inline-block}.slot:not(:last-of-type) .board-slot{border-bottom:1px solid var(--schedule-border-color,hsla(0,0%,47.1%,.7));-webkit-box-sizing:border-box;box-sizing:border-box}.slot{position:relative}.time-slot{height:100%;display:inline-block;width:var(--timeline-width);text-align:center;top:-9px;position:absolute;color:hsla(0,0%,47.1%,.8);font-family:Arial;font-size:14px}.board-slot{float:right;height:100%;width:calc(100% - var(--timeline-width))}"}}export{t as ScheduleDay,s as ScheduleDayBoard};