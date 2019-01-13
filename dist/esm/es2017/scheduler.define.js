
// scheduler: Custom Elements Define Library, ES Module/es2017 Target

import { defineCustomElement } from './scheduler.core.js';
import {
  ScheduleContainer,
  ScheduleDayBoardComponent,
  ScheduleDayComponent,
  ScheduleDayEventComponent,
  ScheduleResourceComponent
} from './scheduler.components.js';

export function defineCustomElements(win, opts) {
  return defineCustomElement(win, [
    ScheduleContainer,
    ScheduleDayBoardComponent,
    ScheduleDayComponent,
    ScheduleDayEventComponent,
    ScheduleResourceComponent
  ], opts);
}
