import { createReducer, on } from '@ngrx/store';

import { LayoutPageActions } from './../actions/layout.actions';

export const stateName = 'layout';
export interface LayoutState {
  loading: boolean;
  showSidenav: boolean;
}

export const initialState: LayoutState = {
  loading: false,
  showSidenav: false,
};

export const layoutReducer = createReducer(
  initialState,
  on(LayoutPageActions.showLoadingSpinner, (state) => ({
    ...state,
    loading: true,
  })),
  on(LayoutPageActions.hideLoadingSpinner, (state) => ({
    ...state,
    loading: false,
  }))
);
