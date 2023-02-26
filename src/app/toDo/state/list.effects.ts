import { map, mergeMap, switchMap } from 'rxjs/operators';
import {
  addList,
  addListSuccess,
  deleteList,
  deleteListSuccess,
  loadLists,
  loadListsSuccess,
  updateList,
  updateListSuccess,
} from './list.actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { ListsService } from 'src/app/services/lists.service';
import { Store } from '@ngrx/store';
import { ListState } from './list.state';
import { setLoadingSpinner } from 'src/app/store/app.actions';

/**
 * Calls side effects based on actions to complete API calls and if successful dispatches an action to update state
 */
@Injectable()
export class ListsEffects {
  constructor(private actions$: Actions, private listsService: ListsService, private store: Store<ListState>) {}

  /**
   * Gets todo lists from DB and dispatches loadListsSuccess to update state
   */
  loadLists$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadLists),
      mergeMap((action) => {
        this.store.dispatch(setLoadingSpinner({status: true})); // show loader before API call
        return this.listsService.getLists().pipe(
          map((lists) => {
            this.store.dispatch(setLoadingSpinner({status: false})); // dismiss loader after successful API call
            return loadListsSuccess({ list: lists });
          })
        );
      })
    );
  });

  /**
   * Adds todo list item in DB and dispatches addListSuccess to update state
   */
  addList$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(addList),
      mergeMap((action) => {
        this.store.dispatch(setLoadingSpinner({status: true}));
        return this.listsService.addList(action.list).pipe(
          map((data) => {
            this.store.dispatch(setLoadingSpinner({status: false}));
            const list = { ...data };
            return addListSuccess({ list: list });
          })
        );
      })
    );
  });

  /**
   * Updates todo list item in DB and dispatches updateListSuccess to update state
   */
  updateList$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(updateList),
      switchMap((action) => {
        this.store.dispatch(setLoadingSpinner({status: true}));
        return this.listsService.updateList(action.list).pipe(
          map((data) => {
            this.store.dispatch(setLoadingSpinner({status: false}));
            return updateListSuccess({ list: action.list });
          })
        );
      })
    );
  });

  /**
   * Delets todo list item in DB and dispatches deleteListSuccess to update state
   */
  deleteList$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(deleteList),
      switchMap((action) => {
        this.store.dispatch(setLoadingSpinner({status: true}));
        return this.listsService.deleteList(action.id).pipe(
          map((data) => {
            this.store.dispatch(setLoadingSpinner({status: false}));
            return deleteListSuccess({ id: action.id });
          })
        );
      })
    );
  });
}
