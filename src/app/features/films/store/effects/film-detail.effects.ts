import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { routerCancelAction } from '@ngrx/router-store';
import { Store } from '@ngrx/store';

// rxjs
import { catchError, finalize, from, map, mergeMap, Observable, of, switchMap, takeUntil, tap, toArray } from 'rxjs';

// services
import { FilmsService } from '../../services';
import { buildRoute, extractItemId } from '../../../../shared/core/helpers/helpers.service';

// models
import { Film } from '../../models';
import { Starship } from '../../../../shared/core/models';
import { RelatedResourceDataSnapshot } from '../../../../shared/core/models';

import { LayoutPageActions } from '../../../../core/store';
import { FilmDetailPageActions, FilmDetailAPIActions } from '../actions';

export const loadSelectedFilms$ = createEffect(
  (filmsService = inject(FilmsService), actions$ = inject(Actions), store = inject(Store)) =>
    actions$.pipe(
      ofType(FilmDetailPageActions.loadSelectedFilm),
      tap(() => store.dispatch(LayoutPageActions.showLoadingSpinner())),
      switchMap(({ id }) =>
        filmsService.getFilm(id).pipe(
          map((film: Film) => ({ ...film, id: extractItemId(film.url) })),
          map((film: Film) => FilmDetailAPIActions.filmLoadedSuccess({ film })),
          finalize(() => store.dispatch(LayoutPageActions.hideLoadingSpinner())),
          takeUntil(actions$.pipe(ofType(routerCancelAction))),
          catchError(({ message }) => of(FilmDetailAPIActions.filmLoadedFail({ message })))
        )
      )
    ),
  { functional: true, useEffectsErrorHandler: true }
);

export const loadFilmDependency$ = createEffect(
  (actions$ = inject(Actions)) =>
    actions$.pipe(
      ofType(FilmDetailPageActions.loadFilmDependency),
      switchMap(({ film }) => [
        FilmDetailPageActions.loadCharacters({ film }),
        FilmDetailPageActions.loadPlanets({ film }),
        FilmDetailPageActions.loadStarships({ film }),
        FilmDetailPageActions.loadSpecies({ film }),
        FilmDetailPageActions.loadVehicles({ film }),
      ])
    ),
  { functional: true, useEffectsErrorHandler: true }
);

export const loadCharacters$ = createEffect(
  (actions$ = inject(Actions), filmsService = inject(FilmsService)) =>
    actions$.pipe(
      ofType(FilmDetailPageActions.loadCharacters),
      switchMap(({ film }) =>
        loadFilmDeps(filmsService, film.characters, 'characters').pipe(
          takeUntil(actions$.pipe(ofType(FilmDetailPageActions.cancelRequest)))
        )
      ),
      map((characters: RelatedResourceDataSnapshot[]) => FilmDetailAPIActions.charactersLoadedSuccess({ characters })),
      catchError(({ message }) => of(FilmDetailAPIActions.charactersLoadedFail({ message })))
    ),
  { functional: true, useEffectsErrorHandler: true }
);

export const loadPlanets$ = createEffect(
  (actions$ = inject(Actions), filmsService = inject(FilmsService)) =>
    actions$.pipe(
      ofType(FilmDetailPageActions.loadPlanets),
      switchMap(({ film }) =>
        loadFilmDeps(filmsService, film.planets, 'planets').pipe(
          takeUntil(actions$.pipe(ofType(FilmDetailPageActions.cancelRequest)))
        )
      ),
      map((planets) => FilmDetailAPIActions.planetsLoadedSuccess({ planets })),
      catchError(({ message }) => of(FilmDetailAPIActions.planetsLoadedFail({ message })))
    ),
  { functional: true, useEffectsErrorHandler: true }
);

export const loadStarships$ = createEffect(
  (actions$ = inject(Actions), filmsService = inject(FilmsService)) =>
    actions$.pipe(
      ofType(FilmDetailPageActions.loadStarships),
      switchMap(({ film }) =>
        loadFilmDeps<Starship>(filmsService, film.starships, 'starships').pipe(
          takeUntil(actions$.pipe(ofType(FilmDetailPageActions.cancelRequest)))
        )
      ),
      map((starships) => FilmDetailAPIActions.starshipsLoadedSuccess({ starships })),
      catchError(({ message }) => of(FilmDetailAPIActions.starshipsLoadedFail({ message })))
    ),
  { functional: true, useEffectsErrorHandler: true }
);

export const loadSpecies$ = createEffect(
  (actions$ = inject(Actions), filmsService = inject(FilmsService)) =>
    actions$.pipe(
      ofType(FilmDetailPageActions.loadSpecies),
      switchMap(({ film }) =>
        loadFilmDeps(filmsService, film.species, 'species').pipe(
          takeUntil(actions$.pipe(ofType(FilmDetailPageActions.cancelRequest)))
        )
      ),
      map((species) => FilmDetailAPIActions.speciesLoadedSuccess({ species })),
      catchError(({ message }) => of(FilmDetailAPIActions.speciesLoadedFail({ message })))
    ),
  { functional: true, useEffectsErrorHandler: true }
);

export const loadVehicles$ = createEffect(
  (actions$ = inject(Actions), filmsService = inject(FilmsService)) =>
    actions$.pipe(
      ofType(FilmDetailPageActions.loadVehicles),
      switchMap(({ film }) =>
        loadFilmDeps(filmsService, film.vehicles, 'vehicles').pipe(
          takeUntil(actions$.pipe(ofType(FilmDetailPageActions.cancelRequest)))
        )
      ),
      map((vehicles) => FilmDetailAPIActions.vehiclesLoadedSuccess({ vehicles })),
      catchError(({ message }) => of(FilmDetailAPIActions.vehiclesLoadedFail({ message })))
    ),
  { functional: true, useEffectsErrorHandler: true }
);

export const filmLoadedFail$ = createEffect(
  (actions$ = inject(Actions)) =>
    actions$.pipe(
      ofType(FilmDetailAPIActions.filmLoadedFail),
      map(() => LayoutPageActions.showAppUnavailable())
    ),
  { functional: true }
);

export function loadFilmDeps<T extends { url: string; name?: string }>(
  serviceInjector: FilmsService,
  urls: string[],
  routeName: string = '/'
): Observable<RelatedResourceDataSnapshot[]> {
  return from(urls).pipe(
    mergeMap((url: string) =>
      serviceInjector.loadDataByUrl<T>(url).pipe(catchError(() => of({ url, name: ' unknown name' }) as Observable<T>))
    ),
    toArray(),
    map(
      (data: T[]) =>
        data.map((item: T) => ({
          url: item.url,
          name: item.name,
          route: buildRoute(item.url, routeName),
        })) as RelatedResourceDataSnapshot[]
    )
  );
}
