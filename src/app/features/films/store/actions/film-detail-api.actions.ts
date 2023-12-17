import { createActionGroup, props } from '@ngrx/store';

// models
import { Film } from '../../models';
import { RelatedResourceDataSnapshot } from '../../../../shared/core/models';

export const FilmDetailAPIActions = createActionGroup({
  source: 'Film detail API',
  events: {
    filmLoadedSuccess: props<{ film: Film }>(),
    filmLoadedFail: props<{ message: string }>(),
    charactersLoadedSuccess: props<{ characters: RelatedResourceDataSnapshot[] }>(),
    charactersLoadedFail: props<{ message: string }>(),
    planetsLoadedSuccess: props<{ planets: RelatedResourceDataSnapshot[] }>(),
    planetsLoadedFail: props<{ message: string }>(),
    starshipsLoadedSuccess: props<{ starships: RelatedResourceDataSnapshot[] }>(),
    starshipsLoadedFail: props<{ message: string }>(),
    vehiclesLoadedSuccess: props<{ vehicles: RelatedResourceDataSnapshot[] }>(),
    vehiclesLoadedFail: props<{ message: string }>(),
    speciesLoadedSuccess: props<{ species: RelatedResourceDataSnapshot[] }>(),
    speciesLoadedFail: props<{ message: string }>(),
  },
});
