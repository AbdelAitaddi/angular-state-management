import { createFeature } from '@ngrx/store';

import * as fromRoot from '../../../../core/store';
import * as fromFilms from './films.reducer';

export interface State extends fromRoot.State {
  [fromFilms.filmsFeatureKey]: fromFilms.State;
}

export const filmsFeature = createFeature({
  name: fromFilms.filmsFeatureKey,
  reducer: fromFilms.reducer,
  extraSelectors: fromFilms.extraSelectors,
});
