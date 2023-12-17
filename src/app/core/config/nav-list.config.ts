import { NavItem } from '../models';

export const nav_List: NavItem[] = [
  {
    route: '/',
    name: 'Star Wars',
    exact: true,
  },
  {
    route: '/films',
    name: 'Filme',
    exact: false,
  },
  {
    route: '/characters',
    name: 'Charaktere',
    exact: false,
  },
  {
    route: '/planets',
    name: 'Planeten',
    exact: false,
  },
];
