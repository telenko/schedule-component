
// scheduler: Custom Elements Define Library, ES Module/es5 Target

import { defineCustomElement } from './scheduler.core.js';
import {
  ScheduleContainer,
  ScheduleDayBoardComponent,
  ScheduleDayBoardComponent,
  ScheduleDayComponent,
  ScheduleResourceComponent
} from './scheduler.components.js';

export function defineCustomElements(win, opts) {
  return defineCustomElement(win, [
    ScheduleContainer,
    ScheduleDayBoardComponent,
    ScheduleDayBoardComponent,
    ScheduleDayComponent,
    ScheduleResourceComponent
  ], opts);
}
