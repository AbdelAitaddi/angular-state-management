import { Routes } from '@angular/router';

const charactersRoutes: Routes = [
  {
    path: '',
    title: 'Characters list',
    loadComponent: () => import('./containers/character-list/character-list.component'),
    data: { animation: 'charactersListPage' },
  },
  {
    path: ':characterId',
    title: 'Character detail',
    loadComponent: () => import('./containers/character-detail/character-detail.component'),
    data: { animation: 'charactersDetailPage' },
  },
];

export default charactersRoutes;
