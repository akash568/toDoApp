import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatDialog,
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { mockListData } from '../../shared/mock/mocklist';
import { listsReducer } from '../state/list.reducer';
import { LIST_STATE_NAME } from '../state/list.selectors';

import { AddUpdateListComponent } from './add-update-list.component';

describe('AddUpdateListComponent', () => {
  let component: AddUpdateListComponent;
  let fixture: ComponentFixture<AddUpdateListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddUpdateListComponent],
      imports: [
        MatDialogModule,
        StoreModule.forRoot({}),
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        BrowserAnimationsModule,
        StoreModule.forFeature(LIST_STATE_NAME, listsReducer),
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
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUpdateListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
