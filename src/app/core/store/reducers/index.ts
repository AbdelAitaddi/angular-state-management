import { ActionReducerMap } from '@ngrx/store';
import * as fromRouter from '@ngrx/router-store';
import * as fromLayout from './layout.reducer';

export * from './layout.reducer';

export interface State {
  [fromLayout.stateName]: fromLayout.LayoutState;
  router: fromRouter.RouterReducerState;
}

export const reducers: ActionReducerMap<State> = {
  [fromLayout.stateName]: fromLayout.layoutReducer,
  router: fromRouter.routerReducer,
};
