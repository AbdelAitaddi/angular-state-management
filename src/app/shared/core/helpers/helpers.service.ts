// models
import { Film } from '../../../features/films/models';

export const isFilmResource = (event): event is Film => {
  return (event as Film).title !== undefined;
};

export const buildRoute = (url: string, resource: string): [string, string] | null => {
  const domainRoutes = ['films', 'characters', 'planets'];

  return domainRoutes.includes(resource) ? [`/${resource}`, extractItemId(url)] : null;
};

export const extractItemId = (url: string): string => {
  const fragments = url.split('/');
  return fragments[fragments.length - 2];
};
