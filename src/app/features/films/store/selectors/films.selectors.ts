import { createFeatureSelector, createSelector } from '@ngrx/store';
import { getRouterSelectors } from '@ngrx/router-store';

import * as fromFilmsReducer from '../reducers/films.reducer';

export const selectFilmsState = createFeatureSelector<fromFilmsReducer.State>(fromFilmsReducer.filmsFeatureKey);
export const selectFilmsEntities = createSelector(selectFilmsState, fromFilmsReducer.selectEntities);
export const selectFilms = createSelector(selectFilmsState, fromFilmsReducer.selectAll);
export const selectLoaded = createSelector(selectFilmsState, fromFilmsReducer.getLoaded);
export const selectCharactersState = createSelector(selectFilmsState, fromFilmsReducer.getCharactersState);
export const selectPlanetsState = createSelector(selectFilmsState, fromFilmsReducer.getPlanetsState);
export const selectStarshipsState = createSelector(selectFilmsState, fromFilmsReducer.getStarshipsState);
export const selectVehiclesState = createSelector(selectFilmsState, fromFilmsReducer.getVehiclesState);
export const selectSpeciesState = createSelector(selectFilmsState, fromFilmsReducer.getSpeciesState);
export const selectFilmById = createSelector(
  selectFilmsEntities,
  getRouterSelectors().selectRouteParam('filmId'),
  (filmsEntities, filmId) => (filmId && filmsEntities[filmId]) || null
);

export const selectFilmsPageVm = createSelector({ films: selectFilms });

export const selectFilmDetailPageVm = createSelector({
  filmDetail: selectFilmById,
  characters: selectCharactersState,
  planets: selectPlanetsState,
  starships: selectStarshipsState,
  vehicles: selectVehiclesState,
  species: selectSpeciesState,
});
