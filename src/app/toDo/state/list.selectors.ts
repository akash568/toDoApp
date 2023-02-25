import { ListState } from './list.state';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const LIST_STATE_NAME = 'lists';
const getListsState = createFeatureSelector<ListState>(LIST_STATE_NAME);

/**
 * @returns {List[]} from store
 */
export const getLists = createSelector(getListsState, (state) => {
  return state.lists;
});
