import { AppState } from './app.state';
import { createFeatureSelector, createSelector } from '@ngrx/store';
export const APP_STATE_NAME = 'app';

const getAppState = createFeatureSelector<AppState>(APP_STATE_NAME);

export const getLoading = createSelector(getAppState, (state) => {
  return state.showLoading;
});