import { createActionGroup, props } from '@ngrx/store';

// models
import { Film } from '../../models';

export const FilmsAPIActions = createActionGroup({
  source: 'Films API',
  events: {
    filmsLoadedSuccess: props<{ films: Film[] }>(),
    filmsLoadedFail: props<{ message: string }>(),
  },
});
