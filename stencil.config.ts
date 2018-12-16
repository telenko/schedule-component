import { Config } from '@stencil/core';

export const config: Config = {
  namespace: 'scheduler',
  outputTargets:[
    {
      type: 'www',
      serviceWorker: null // disable service workers
    }
  ]
};
