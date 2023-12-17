import { Title } from '@angular/platform-browser';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import * as fromRouter from '@ngrx/router-store';

// rxjs
import { delay, map, tap } from 'rxjs';

import { LayoutPageActions } from '../actions';

@Injectable()
export class RouterEffects {
  readonly actions$ = inject(Actions);
  readonly store = inject(Store);
  readonly router = inject(Router);

  constructor(private titleService: Title) {}

  updateTitle$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromRouter.routerNavigatedAction),
        concatLatestFrom(() => this.store.select(fromRouter.getRouterSelectors().selectTitle)),
        map(([, pageTitle]) => {
          const portalTitle: string = 'Star Wars';
          return pageTitle ? `${pageTitle} - ${portalTitle}` : portalTitle;
        }),
        delay(10),
        tap((title) => this.titleService.setTitle(title))
      ),
    {
      dispatch: false,
    }
  );

  redirectToAppUnavailable$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(LayoutPageActions.showAppUnavailable),
        tap(() => this.router.navigateByUrl('/app-unavailable', { skipLocationChange: true }))
      ),
    { functional: true, dispatch: false }
  );
}
