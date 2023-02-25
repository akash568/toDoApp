import { createAction, props } from '@ngrx/store';
import { List } from '../models/todo.model';

// Feature actions identifires
export const ADD_LIST_ACTION = '[List page] add list';
export const ADD_LIST_SUCCESS = '[List page] add list success';
export const UPDATE_LIST_ACTION = '[List page] update list';
export const UPDATE_LIST_SUCCESS = '[List page] update list success';
export const DELETE_LIST_ACTION = '[List page] delete list';
export const DELETE_LIST_SUCCESS = '[List page] delete list success';
export const LOAD_LISTS = '[List page] load lists';
export const LOAD_LISTS_SUCCESS = '[List page] load lists success';

// Generated actions
/**
 * adds item in DB
 */
export const addList = createAction(ADD_LIST_ACTION, props<{ list: List }>());
/**
 * updates state after addList action is successful
 */
export const addListSuccess = createAction(
  ADD_LIST_SUCCESS,
  props<{ list: List }>()
);
/**
 * updates item in DB
 */
export const updateList = createAction(
  UPDATE_LIST_ACTION,
  props<{ list: List }>()
);
/**
 * update state after updateList is successful
 */
export const updateListSuccess = createAction(
  UPDATE_LIST_SUCCESS,
  props<{ list: List }>()
);

/**
 * delets item in DB
 */
export const deleteList = createAction(
  DELETE_LIST_ACTION,
  props<{ id: number }>()
);
/**
 * update state after deleteList is successful
 */
export const deleteListSuccess = createAction(
  DELETE_LIST_SUCCESS,
  props<{ id: number }>()
);

/**
 * Loads lists from DB
 */
export const loadLists = createAction(LOAD_LISTS);
/**
 * Update state after loadLists is successful
 */
export const loadListsSuccess = createAction(
  LOAD_LISTS_SUCCESS,
  props<{ list: List[] }>()
);
