import {
  loadListsSuccess,
  addListSuccess,
  updateListSuccess,
  deleteListSuccess,
} from './list.actions';
import { createReducer, on } from '@ngrx/store';
import { initialState, ListState } from './list.state';

// Creates reducer
const _listsReducer = createReducer(
  initialState,
  // Add new list in store
  on(addListSuccess, (state, action) => {
    let list = { ...action.list };

    return {
      ...state,
      lists: [...state.lists, list],
    };
  }),
  // Update existing list in store 
  on(updateListSuccess, (state, action) => {
    const updatedLists = state.lists.map((list) => {
      return action.list.id === list.id ? action.list : list;
    });

    return {
      ...state,
      lists: updatedLists,
    };
  }),
  // Removes list from store
  on(deleteListSuccess, (state, { id }) => {
    const updatedLists = state.lists.filter((list) => {
      return list.id !== id;
    });

    return {
      ...state,
      lists: updatedLists,
    };
  }),
  // Sets fetched lists in store
  on(loadListsSuccess, (state, action) => {

    return {
      ...state,
      lists: action.list,
    };
  })
);

// Exports a reducer function to generate store from module
export function listsReducer(state: ListState, action: any) {
  return _listsReducer(state, action);
}
