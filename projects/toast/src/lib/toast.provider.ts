import { ENVIRONMENT_INITIALIZER, EnvironmentProviders, inject, Provider } from '@angular/core';

import { ToastService } from './toast.service';

export const provideToast = (): Array<Provider | EnvironmentProviders> => {
  return [
    {
      provide: ENVIRONMENT_INITIALIZER,
      useValue: () => inject(ToastService),
      multi: true,
    }
  ];
};
