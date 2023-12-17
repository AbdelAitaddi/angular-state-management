import { EnvironmentProviders, isDevMode, makeEnvironmentProviders } from '@angular/core';
import { MetaReducer, provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideRouterStore } from '@ngrx/router-store';
import { storeFreeze } from 'ngrx-store-freeze';

import * as fromCore from './core/store';

const metaReducers: MetaReducer<fromCore.State>[] = isDevMode() ? [storeFreeze] : [];

export function provideStoreConfig(): EnvironmentProviders {
  return makeEnvironmentProviders([
    provideStore(fromCore.reducers, {
      metaReducers: metaReducers,
      runtimeChecks: {
        strictStateSerializability: true,
        strictActionSerializability: true,
        strictActionWithinNgZone: true,
        strictActionTypeUniqueness: true,
      },
    }),
    provideRouterStore(),
    provideEffects(fromCore.effects),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
      connectInZone: true,
      name: 'Assecor assessment App',
    }),
  ]);
}
