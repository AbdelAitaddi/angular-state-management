import {
  ApplicationConfig,
  provideZoneChangeDetection,
  InjectionToken,
  importProvidersFrom,
  EnvironmentProviders,
  makeEnvironmentProviders,
} from '@angular/core';
import { UrlSerializer } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';

import { provideRouterConfig } from './app.routes';
import { provideStoreConfig } from './app.store';
import { CustomUrlSerializer } from './shared/core/helpers/custom-url-serializer';
import { REMOVE_STYLES_ON_COMPONENT_DESTROY } from '@angular/platform-browser';
import { IMAGE_CONFIG } from '@angular/common';

export const BROWSER_LOCATION = new InjectionToken<Location>('window location');

export const config: ApplicationConfig = {
  providers: [
    provideAnimations(), // provideAnimationsAsync() | provideAnimationsAsync('noop')
    provideHttpClient(withInterceptorsFromDi()),
    importProvidersFrom([MatDialogModule]),
    appEnvironmentProviders(),
    provideRouterConfig(),
    provideStoreConfig(),
    provideZoneChangeDetection({
      eventCoalescing: true, // false
      runCoalescing: true,
    }),
  ],
};

export function appEnvironmentProviders(): EnvironmentProviders {
  return makeEnvironmentProviders([
    {
      provide: BROWSER_LOCATION,
      useFactory: () => window.location,
    },
    {
      provide: REMOVE_STYLES_ON_COMPONENT_DESTROY,
      useValue: true,
    },
    {
      provide: UrlSerializer,
      useClass: CustomUrlSerializer,
    },
    {
      provide: IMAGE_CONFIG,
      useValue: {
        disableImageSizeWarning: false,
        disableImageLazyLoadWarning: false,
      },
    },
  ]);
}
