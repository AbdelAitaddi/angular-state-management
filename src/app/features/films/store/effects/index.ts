import { loadFilms$, filmsLoadedFail$ } from './films.effects';

import {
  loadSelectedFilms$,
  loadCharacters$,
  loadPlanets$,
  loadStarships$,
  loadSpecies$,
  loadVehicles$,
  filmLoadedFail$,
  loadFilmDependency$,
} from './film-detail.effects';

export const effects = {
  loadFilms$,
  filmsLoadedFail$,
  loadSelectedFilms$,
  loadFilmDependency$,
  loadCharacters$,
  loadPlanets$,
  loadStarships$,
  loadSpecies$,
  loadVehicles$,
  filmLoadedFail$,
};
