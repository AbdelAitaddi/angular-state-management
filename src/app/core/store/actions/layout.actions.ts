import { createActionGroup, emptyProps } from '@ngrx/store';

export const LayoutPageActions = createActionGroup({
  source: 'Layout Page',
  events: {
    openSidenav: emptyProps(),
    closeSidenav: emptyProps(),
    showLoadingSpinner: emptyProps(),
    hideLoadingSpinner: emptyProps(),
    showAppUnavailable: emptyProps(),
  },
});
