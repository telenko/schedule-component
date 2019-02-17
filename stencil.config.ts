import { Config } from '@stencil/core';

export const config: Config = {
  namespace: 'scheduler',
  outputTargets: [
    {
      type: 'dist'
    },
    {
      type: 'www',
      serviceWorker: null // disable service workers
    }
  ],
  bundles: [
    { components: ['schedule-resource', 'schedule-day-event', 'schedule-day', 'schedule-day-board'] }
  ]
};
