import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StoreModule } from '@ngrx/store';
import { mockListData } from '../../shared/mock/mocklist';
import { SharedModule } from '../../shared/shared.module';
import { listsReducer } from '../state/list.reducer';
import { LIST_STATE_NAME } from '../state/list.selectors';

import { ListComponent } from './list.component';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListComponent ],
      imports: [StoreModule.forRoot({}), StoreModule.forFeature(LIST_STATE_NAME, listsReducer), SharedModule],
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
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
