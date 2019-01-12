import { Config } from '@stencil/core';

export const config: Config = {
  namespace: 'scheduler',
  bundles: [
    { components: ['schedule-resource', 'schedule-day-event', 'schedule-day', 'schedule-day-board', 'schedule-container'] }
  ],
   outputTargets:[
    {
      type: 'www',
      serviceWorker: null // disable service workers
    }
  ]
  // namespace: 'scheduler',
  // outputTargets:[
  //   {
  //     type: 'www',
  //     serviceWorker: null // disable service workers
  //   }
  // ]
};
