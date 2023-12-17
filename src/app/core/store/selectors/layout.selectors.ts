import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromLayout from '../reducers/layout.reducer';

export const selectLayoutState = createFeatureSelector<fromLayout.LayoutState>(fromLayout.stateName);

export const selectIsLoading = createSelector(selectLayoutState, (state) => state.loading);
