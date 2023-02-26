import { createAction, props } from '@ngrx/store';
export const SET_LOADING_ACTION = '[App state] set loading spinner';

/**
 * Action to update loader status
 */
export const setLoadingSpinner = createAction(
  SET_LOADING_ACTION,
  props<{ status: boolean }>()
);
