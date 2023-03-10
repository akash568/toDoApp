import { AppState } from './app.state';
import { createFeatureSelector, createSelector } from '@ngrx/store';
export const APP_STATE_NAME = 'app';

const getAppState = createFeatureSelector<AppState>(APP_STATE_NAME);

/**
 * Fectch loader status from App store
 */
export const getLoading = createSelector(getAppState, (state) => {
  return state.showLoading;
});