import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  MatDialog,
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from '../../shared/shared.module';
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
        SharedModule,
        NoopAnimationsModule,
        StoreModule.forFeature(LIST_STATE_NAME, listsReducer),
      ],
      providers: [
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            noteType: 3,
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

  // Test Case 1
  it('should create AddUpdateListComponent', () => {
    expect(component).toBeTruthy();
  });

  // Test Case 2
  it('should have title as "Add into To Do list"', () => {
    expect(
      fixture.debugElement.query(By.css('h1.mat-dialog-title')).nativeElement
        .textContent
    ).toContain('Add into To Do list');
  });

  // Test Case 3
  it('show error if note is empty', () => {
    component.listForm.controls['note'].setValue(null);
    component.listForm.controls['note'].markAsTouched();
    fixture.detectChanges();
    const errMsg = fixture.debugElement.query(
      By.css('#note-field mat-error')
    ).nativeElement;
    expect(errMsg.textContent).toContain('Note is required!');
  });

  // Test Case 4
  it('show error if due date is empty', () => {
    component.listForm.controls['dueDate'].setValue(null);
    component.listForm.controls['dueDate'].markAsTouched();
    fixture.detectChanges();
    const errMsg = fixture.debugElement.query(
      By.css('#due-field mat-error')
    ).nativeElement;
    expect(errMsg.textContent).toContain('Due date is required!');
  });

  // Test Case 5
  it('should show error if no files are uploaded and user adds or updates note', () => {
    component.files = [];

    const submitBtn: HTMLButtonElement = fixture.debugElement.query(
      By.css('div.footer-wrapper button#submit-btn')
    ).nativeElement;
    submitBtn.click();
    fixture.detectChanges();

    const errMsg = fixture.debugElement.query(
      By.css('.input-wrapper mat-error#upload-err')
    ).nativeElement;
    expect(errMsg.textContent).toContain('Attachment is required!');
  });

  // Test Case 6
  it('should show files as per updated files', () => {
    const files = component.data.list.file!;
    for (let i = 0; i < (files?.length || 0); i++) {
      expect(
        fixture.debugElement.query(By.css(`div#fname${i}`)).nativeElement
          .textContent
      ).toContain(files[i].name);
    }
  });

  // Test Case 7
  it('should remove uploaded files on clicking X icon', () => {
    const files = component.data.list.file!;
    expect(component.files.length > 0);

    for (let i = 0; i < (files?.length || 0); i++) {
      fixture.debugElement
        .query(By.css(`mat-icon#fremove0`))
        .nativeElement.click();
    }

    expect(component.files.length === 0);
  });

  // Test Case 8
  it('should have submit button as "Update"', () => {
    expect(
      fixture.debugElement.query(By.css('div.footer-wrapper button#submit-btn'))
        .nativeElement.textContent
    ).toContain('Update');
  });
});
