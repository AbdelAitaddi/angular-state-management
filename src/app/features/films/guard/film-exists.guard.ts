import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn } from '@angular/router';
import { Store } from '@ngrx/store';

// models
import { Film } from '../models';

// services
import * as fromStore from '../store';

// rxjs
import { filter, Observable, of, tap } from 'rxjs';
import { switchMap, catchError, take } from 'rxjs/operators';

export const filmExistsGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const { filmId } = route.params;

  return checkStore(filmId).pipe(
    switchMap(() => of(true)),
    catchError(() => of(false))
  );
};

export function checkStore(id: string): Observable<Film> {
  const store: Store<fromStore.State> = inject(Store);

  return store.select(fromStore.selectFilmById).pipe(
    tap((hasFilm: Film | null) => {
      if (!hasFilm) {
        store.dispatch(fromStore.FilmDetailPageActions.loadSelectedFilm(id));
      }
    }),
    filter(Boolean),
    tap((film: Film) => store.dispatch(fromStore.FilmDetailPageActions.loadFilmDependency({ film }))),
    take(1)
  );
}
