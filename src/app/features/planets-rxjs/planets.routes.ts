import { Routes } from '@angular/router';
import { planetsGuard, planetExistsGuard } from './guard';

const planetsRoutes: Routes = [
  {
    path: '',
    title: 'Planets list',
    canActivate: [planetsGuard],
    data: { animation: 'planetsListPage' },
    loadComponent: () =>
      import('./containers/planet-list/planet-list.component').then((cmp) => cmp.PlanetListComponent),
  },
  {
    path: ':planetId',
    title: 'Planet detail',
    canActivate: [planetExistsGuard],
    data: { animation: 'planetsDetailPage' },
    loadComponent: () => import('./containers/planet-detail/planet-detail.component').then((cmp) => cmp.PlanetDetail),
  },
];

export default planetsRoutes;
