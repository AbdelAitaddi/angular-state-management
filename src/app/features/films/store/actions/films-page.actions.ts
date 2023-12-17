import { createActionGroup, emptyProps } from '@ngrx/store';

export const FilmsPageActions = createActionGroup({
  source: 'Films Page',
  events: {
    loadFilms: emptyProps(),
  },
});
