import { createReducer, on } from '@ngrx/store';

import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import { Film } from '../../models';
import { RelatedResource } from '../../../../shared/core/models';

import { FilmsAPIActions, FilmsPageActions, FilmDetailAPIActions, FilmDetailPageActions } from '../actions';

export const filmsFeatureKey = 'films';

export interface State extends EntityState<Film> {
  loading: boolean;
  loaded: boolean;
  errorMessage: string;
  selectedFilmId: string | null;
  characters: RelatedResource;
  planets: RelatedResource;
  starships: RelatedResource;
  vehicles: RelatedResource;
  species: RelatedResource;
}

const FilmAdapter: EntityAdapter<Film> = createEntityAdapter<Film>({
  selectId: (film: Film) => film.id,
  sortComparer: false,
});

const initialState: State = FilmAdapter.getInitialState({
  loading: false,
  loaded: false,
  errorMessage: '',
  selectedFilmId: null,
  characters: {
    loading: false,
    loaded: false,
    data: [],
    errorMessage: '',
  },
  planets: {
    loading: false,
    loaded: false,
    data: [],
    errorMessage: '',
  },
  starships: {
    loading: false,
    loaded: false,
    data: [],
    errorMessage: '',
  },
  vehicles: {
    loading: false,
    loaded: false,
    data: [],
    errorMessage: '',
  },
  species: {
    loading: false,
    loaded: false,
    data: [],
    errorMessage: '',
  },
});

export const reducer = createReducer(
  initialState,
  on(FilmsPageActions.loadFilms, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    errorMessage: '',
  })),
  on(FilmsAPIActions.filmsLoadedSuccess, (state, { films }) =>
    FilmAdapter.addMany(films, {
      ...state,
      loading: false,
      loaded: true,
    })
  ),
  on(FilmsAPIActions.filmsLoadedFail, (state, { message }) => ({
    ...state,
    loading: false,
    loaded: false,
    errorMessage: message,
  })),
  on(FilmDetailPageActions.loadSelectedFilm, (state) => ({
    ...state,
    errorMessage: '',
  })),
  on(FilmDetailAPIActions.filmLoadedSuccess, (state, { film }) => FilmAdapter.addOne(film, state)),
  on(FilmDetailAPIActions.filmLoadedFail, (state, { message }) => ({
    ...state,
    errorMessage: message,
  })),
  on(FilmDetailPageActions.loadCharacters, (state) => ({
    ...state,
    characters: {
      loading: true,
      loaded: false,
      data: [],
      errorMessage: '',
    },
  })),
  on(FilmDetailAPIActions.charactersLoadedSuccess, (state, { characters }) => ({
    ...state,
    characters: {
      ...state.characters,
      loading: false,
      loaded: true,
      data: characters,
    },
  })),
  on(FilmDetailAPIActions.charactersLoadedFail, (state, { message }) => ({
    ...state,
    characters: {
      ...state.characters,
      loading: false,
      loaded: false,
      data: [],
      errorMessage: message,
    },
  })),
  on(FilmDetailPageActions.loadPlanets, (state) => ({
    ...state,
    planets: {
      loading: true,
      loaded: false,
      data: [],
      errorMessage: '',
    },
  })),
  on(FilmDetailAPIActions.planetsLoadedSuccess, (state, { planets }) => ({
    ...state,
    planets: {
      ...state.planets,
      loading: false,
      loaded: true,
      data: planets,
    },
  })),
  on(FilmDetailAPIActions.planetsLoadedFail, (state, { message }) => ({
    ...state,
    planets: {
      ...state.planets,
      loading: false,
      loaded: false,
      data: [],
      errorMessage: message,
    },
  })),
  on(FilmDetailPageActions.loadStarships, (state) => ({
    ...state,
    starships: {
      loading: true,
      loaded: false,
      data: [],
      errorMessage: '',
    },
  })),
  on(FilmDetailAPIActions.starshipsLoadedSuccess, (state, { starships }) => ({
    ...state,
    starships: {
      ...state.starships,
      loading: false,
      loaded: true,
      data: starships,
    },
  })),
  on(FilmDetailAPIActions.starshipsLoadedFail, (state, { message }) => ({
    ...state,
    starships: {
      ...state.starships,
      loading: false,
      loaded: false,
      data: [],
      errorMessage: message,
    },
  })),
  on(FilmDetailPageActions.loadVehicles, (state) => ({
    ...state,
    vehicles: {
      loading: true,
      loaded: false,
      data: [],
      errorMessage: '',
    },
  })),
  on(FilmDetailAPIActions.vehiclesLoadedSuccess, (state, { vehicles }) => ({
    ...state,
    vehicles: {
      ...state.vehicles,
      loading: false,
      loaded: true,
      data: vehicles,
    },
  })),
  on(FilmDetailAPIActions.vehiclesLoadedFail, (state, { message }) => ({
    ...state,
    vehicles: {
      ...state.vehicles,
      loading: false,
      loaded: false,
      data: [],
      errorMessage: message,
    },
  })),
  on(FilmDetailPageActions.loadSpecies, (state) => ({
    ...state,
    species: {
      loading: true,
      loaded: false,
      data: [],
      errorMessage: '',
    },
  })),
  on(FilmDetailAPIActions.speciesLoadedSuccess, (state, { species }) => ({
    ...state,
    species: {
      ...state.species,
      loading: false,
      loaded: true,
      data: species,
    },
  })),
  on(FilmDetailAPIActions.speciesLoadedFail, (state, { message }) => ({
    ...state,
    species: {
      ...state.species,
      loading: false,
      loaded: false,
      data: [],
      errorMessage: message,
    },
  }))
);

export const extraSelectors = ({ selectFilmsState }) => FilmAdapter.getSelectors(selectFilmsState);

const { selectAll, selectEntities, selectIds, selectTotal } = FilmAdapter.getSelectors();

export { selectAll, selectEntities, selectIds, selectTotal };

export const getLoaded = (state: State) => state.loaded;

export const getCharactersState = (state: State): RelatedResource => ({
  data: state.characters.data,
  loading: state.characters.loading,
  loaded: state.characters.loaded,
  errorMessage: state.characters.errorMessage,
});
export const getPlanetsState = (state: State): RelatedResource => ({
  data: state.planets.data,
  loading: state.planets.loading,
  loaded: state.planets.loaded,
  errorMessage: state.planets.errorMessage,
});
export const getStarshipsState = (state: State): RelatedResource => ({
  data: state.starships.data,
  loading: state.starships.loading,
  loaded: state.starships.loaded,
  errorMessage: state.starships.errorMessage,
});
export const getVehiclesState = (state: State): RelatedResource => ({
  data: state.vehicles.data,
  loading: state.vehicles.loading,
  loaded: state.vehicles.loaded,
  errorMessage: state.vehicles.errorMessage,
});
export const getSpeciesState = (state: State): RelatedResource => ({
  data: state.species.data,
  loading: state.species.loading,
  loaded: state.species.loaded,
  errorMessage: state.species.errorMessage,
});
