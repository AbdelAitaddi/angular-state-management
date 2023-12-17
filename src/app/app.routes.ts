import { EnvironmentProviders, inject, makeEnvironmentProviders } from '@angular/core';
import {
  PreloadAllModules,
  provideRouter,
  Router,
  Routes,
  withComponentInputBinding,
  withInMemoryScrolling,
  withNavigationErrorHandler,
  withPreloading,
  withRouterConfig,
  withViewTransitions,
} from '@angular/router';
import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';

// services
import { FilmsService } from './features/films/services';

// store
import * as fromStore from './features/films/store';

const appRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    title: 'Welcome StarWars',
    loadComponent: () => import('./features/home/containers/home.component'),
    data: {
      animation: 'homePage',
      permission: 'admin',
    },
  },
  {
    path: 'films',
    providers: [FilmsService, provideState(fromStore.filmsFeature), provideEffects(fromStore.effects)],
    loadChildren: () => import('./features/films/films.routes'),
  },
  {
    path: 'characters',
    loadChildren: () => import('./features/characters/characters.routes'),
  },
  {
    path: 'planets',
    loadChildren: () => import('./features/planets/planets.routes'),
  },
  {
    path: 'app-unavailable',
    title: 'Application unavailable',
    loadComponent: () => import('./core/containers/app-unavailable/app-unavailable.component'),
  },
  {
    path: '**',
    title: 'Page not found',
    loadComponent: () => import('./core/containers/page-not-found/page-not-found.component'),
  },
];

export function provideRouterConfig(): EnvironmentProviders {
  return makeEnvironmentProviders([
    provideRouter(
      appRoutes,
      //   withViewTransitions({ skipInitialTransition: true }),
      withPreloading(PreloadAllModules),
      withComponentInputBinding(),
      withInMemoryScrolling({ scrollPositionRestoration: 'enabled' }),
      withRouterConfig({ paramsInheritanceStrategy: 'always' }),
      withNavigationErrorHandler(() => inject(Router).navigate(['/app-unavailable'])),
    ),
  ]);
}
