import { setLoadingSpinner } from './app.actions';
import { createReducer, on } from '@ngrx/store';
import { initialState } from './app.state';

export const AppReducer = createReducer(
  initialState,
  on(setLoadingSpinner, (state, action) => {
    return {
      ...state,
      showLoading: action.status,
    };
  })
);
