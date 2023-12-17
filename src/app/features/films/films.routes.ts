import { Routes } from '@angular/router';

// guards
import { filmsGuard, filmExistsGuard } from './guard';

const filmsRoutes: Routes = [
  {
    path: '',
    title: 'Film list',
    canActivate: [filmsGuard],
    loadComponent: () => import('./containers/film-list/film-list.component'),
  },
  {
    path: ':filmId',
    title: 'Film detail',
    canActivate: [filmExistsGuard],
    loadComponent: () => import('./containers/film-detail/film-detail.component'),
  },
];

export default filmsRoutes;
