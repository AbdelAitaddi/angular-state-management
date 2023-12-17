import { inject } from '@angular/core';

import { Store } from '@ngrx/store';
import { routerCancelAction } from '@ngrx/router-store';
import { Actions, createEffect, ofType } from '@ngrx/effects';

// rxjs
import { catchError, exhaustMap, finalize, map, of, switchMap, takeUntil, tap } from 'rxjs';

// services
import { FilmsService } from '../../services';
import { extractItemId } from '../../../../shared/core/helpers/helpers.service';

// models
import { Film, FilmsResults } from '../../models';

// actions
import { FilmsAPIActions, FilmsPageActions } from '../actions';
import { LayoutPageActions } from '../../../../core/store';

export const loadFilms$ = createEffect(
  (filmsService = inject(FilmsService), actions$ = inject(Actions), store = inject(Store)) =>
    actions$.pipe(
      ofType(FilmsPageActions.loadFilms),
      tap(() => store.dispatch(LayoutPageActions.showLoadingSpinner())),
      exhaustMap(() =>
        filmsService.getFilms().pipe(
          map(extractFilms.bind(this)),
          takeUntil(actions$.pipe(ofType(routerCancelAction))),
          switchMap((films: Film[]) => [FilmsAPIActions.filmsLoadedSuccess({ films })]),
          finalize(() => store.dispatch(LayoutPageActions.hideLoadingSpinner())),
          catchError(({ message }) => of(FilmsAPIActions.filmsLoadedFail({ message })))
        )
      )
    ),
  { functional: true, useEffectsErrorHandler: true }
);

export const filmsLoadedFail$ = createEffect(
  (actions$ = inject(Actions)) =>
    actions$.pipe(
      ofType(FilmsAPIActions.filmsLoadedFail),
      map(() => LayoutPageActions.showAppUnavailable())
    ),
  { functional: true }
);

export function extractFilms(data: FilmsResults): Film[] {
  return data.results?.map((item) => ({ ...item, id: extractItemId(item.url) }));
}
