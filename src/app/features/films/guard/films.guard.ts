import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Store } from '@ngrx/store';

// services
import * as fromStore from '../store';

// model
import { State } from '../store';

// rxjs
import { tap, filter } from 'rxjs';
import { take } from 'rxjs/operators';

export const filmsGuard: CanActivateFn = () => {
  const store: Store<State> = inject(Store);

  return store.select(fromStore.selectLoaded).pipe(
    tap((loaded: boolean) => {
      if (!loaded) {
        store.dispatch(fromStore.FilmsPageActions.loadFilms());
      }
    }),
    filter(Boolean),
    take(1)
  );
};
