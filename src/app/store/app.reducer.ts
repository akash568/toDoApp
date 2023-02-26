import { setLoadingSpinner } from './app.actions';
import { createReducer, on } from '@ngrx/store';
import { initialState } from './app.state';

/**
 * App store reducer shared between whole app
 */
export const AppReducer = createReducer(
  initialState,
  // Update loader state based on action prop
  on(setLoadingSpinner, (state, action) => {
    return {
      ...state,
      showLoading: action.status,
    };
  })
);
