import { createActionGroup, emptyProps, props } from '@ngrx/store';

// models
import { Film } from '../../models';

export const FilmDetailPageActions = createActionGroup({
  source: 'Film detail Page',
  events: {
    loadSelectedFilm: (id: string) => ({ id }),
    cancelRequest: emptyProps(),
    loadFilmDependency: props<{ film: Film }>(),
    loadCharacters: props<{ film: Film }>(),
    loadPlanets: props<{ film: Film }>(),
    loadStarships: props<{ film: Film }>(),
    loadVehicles: props<{ film: Film }>(),
    loadSpecies: props<{ film: Film }>(),
  },
});
