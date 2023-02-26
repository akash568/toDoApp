import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { mockListData } from '../../shared/mock/mocklist';
import { SharedModule } from '../../shared/shared.module';
import { listsReducer } from '../state/list.reducer';
import { getLists, LIST_STATE_NAME } from '../state/list.selectors';
import { loadLists, deleteList, updateList } from '../state/list.actions';
import { ListState } from '../state/list.state';

import { ListComponent } from './list.component';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  let store: MockStore;
  const initialState: ListState = {
    lists: [mockListData.list]
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListComponent],
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature(LIST_STATE_NAME, listsReducer),
        SharedModule,
        NoopAnimationsModule
      ],
      providers: [
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            noteType: 1,
            ...mockListData,
          },
        },
        { provide: MatDialogRef, useValue: {} },
        MatDialog,
        provideMockStore({ initialState })
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListComponent);
    store = TestBed.inject(MockStore);
    component = fixture.componentInstance;
    store.overrideSelector(getLists, initialState.lists);
    fixture.detectChanges();
  });

  // Test Case 1
  it('should create ListComponent', () => {
    expect(component).toBeTruthy();
  });

  // Test Case 2
  it('should have title as To Do List', () => {
    expect(
      fixture.debugElement.query(By.css('mat-card-title#list-title'))
        .nativeElement.textContent
    ).toContain('To Do List');
  });

  // Test Case 3
  it('should call updateStatus on clicking Note', async () => {
    const spyUpdateStatus = jest.spyOn(component,'updateStatus');
    fixture.debugElement.query(By.css('#card0')).nativeElement.click();
    expect(spyUpdateStatus).toHaveBeenCalled();
  });

  // Test Case 4
  it('should dispatch loadLists action at initialization', () => {
    const dispatchSpy = jest.spyOn(store, 'dispatch')
    component.ngOnInit();
    fixture.detectChanges();
    expect(dispatchSpy).toHaveBeenCalledWith(loadLists());
  });

  // Test Case 5
  it('should dispatch deleteList on calling deleteToDo', () => {
    const dispatchSpy = jest.spyOn(store, 'dispatch')
    component.deleteToDo(mockListData.list);
    fixture.detectChanges();
    expect(dispatchSpy).toHaveBeenCalledWith(deleteList(mockListData.list));
  });

  // Test Case 6
  it('should dispatch updateList on calling updateStatus', () => {
    const dispatchSpy = jest.spyOn(store, 'dispatch')
    const checkboxRef = fixture.debugElement.query(By.css('mat-checkbox#note-status')).context;
    component.updateStatus(checkboxRef ,mockListData.list);
    // Updating isComplete status as values will be updated within fn
    mockListData.list = {
      ...mockListData.list,
      isComplete: false
    }
    fixture.detectChanges();
    // check value and action matches
    expect(dispatchSpy).toHaveBeenCalledWith(updateList(mockListData));
  })
});
