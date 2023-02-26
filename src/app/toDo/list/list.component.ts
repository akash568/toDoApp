import { Component, OnInit } from '@angular/core';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AddUpdateListComponent } from '../add-update-list/add-update-list.component';
import { ListDetailComponent } from '../list-detail/list-detail.component';
import { List } from '../models/todo.model';
import { deleteList, loadLists, updateList } from '../state/list.actions';
import { getLists } from '../state/list.selectors';
import { ListState } from '../state/list.state';

/**
 * Main component that shows to do list
 */
@Component({
  selector: 'td-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  constructor(public dialog: MatDialog, private store: Store<ListState>) {}

  list$!: Observable<List[]>;

  ngOnInit(): void {
    this.loadList();
  }

  /*--------------------------------------------------------------------
    Private Methods
  --------------------------------------------------------------------*/

  /**
   * Fetch list from store and dispatch action to load lists from DB
   */
  private loadList() {
    this.list$ = this.store.select(getLists);
    this.store.dispatch(loadLists());
  }

  /*--------------------------------------------------------------------
    Public Methods
  --------------------------------------------------------------------*/

  /**
   * Delete item from to do list
   *
   * @param todo List
   */
  public deleteToDo(todo: List) {
    this.store.dispatch(deleteList(todo));
  }

  /**
   * Open ListDetailComponent to show note details
   *
   * @param toDo List
   */
  public viewDetails(toDo: List) {
    this.dialog.open(ListDetailComponent, {
      data: {
        list: toDo,
      },
    });
  }

  /**
   * Open AddUpdateListComponent to update note details
   *
   * @param toDo List
   */
  public updateToDo(toDo: List) {
    this.dialog.open(AddUpdateListComponent, {
      data: {
        noteType: toDo.type,
        list: toDo,
      },
    });
  }

  /**
   * Open AddUpdateListComponent to add note based on type param
   *
   * @param type 1: simple note; 2: note with due date; 3: note with due date and attachments;
   */
  public addToDo(type: 1 | 2 | 3) {
    this.dialog.open(AddUpdateListComponent, {
      data: {
        noteType: type,
      },
    });
  }

  /**
   * Dispatches an action to update list item with updated value of isComplete property
   *
   * @param checkRef MatCheckbox refrence
   * @param listItem list item details
   */
  public updateStatus(checkRef: MatCheckbox, listItem: List) {
    checkRef.toggle();

    this.store.dispatch(
      updateList({
        list: {
          ...listItem,
          isComplete: checkRef.checked,
        },
      })
    );
  }
}
