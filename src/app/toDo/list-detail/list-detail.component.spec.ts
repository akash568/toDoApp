import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  MatDialogModule,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { By } from '@angular/platform-browser';
import { SharedModule } from '../../shared/shared.module';
import { mockListData } from '../../shared/mock/mocklist';

import { ListDetailComponent } from './list-detail.component';

describe('ListDetailComponent', () => {
  let component: ListDetailComponent;
  let fixture: ComponentFixture<ListDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListDetailComponent],
      imports: [MatDialogModule, SharedModule],
      providers: [
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            ...mockListData,
          },
        },
        { provide: MatDialogRef, useValue: {} },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Test case 1
  it('should create ListDetailComponent', () => {
    expect(component).toBeTruthy();
  });

  // Test case 2
  it('title should be list details', () => {
    expect(fixture.debugElement.query(By.css('h1.mat-dialog-title')).nativeElement.textContent).toContain('list details');
  });

  // Test case 3
  it('should match note with mock data', () => {
    expect(fixture.debugElement.query(By.css('p#note-details')).nativeElement.textContent).toContain('Note: Simple note');
  })

  // Test case 4
  it('should match start date with mock data', () => {
    expect(fixture.debugElement.query(By.css('p#start-details')).nativeElement.textContent).toContain('Start Date: Feb 25, 2023');
  });

  // Test case 5
  it('should match due date with mock data', () => {
    expect(fixture.debugElement.query(By.css('p#due-details')).nativeElement.textContent).toContain('Due Date: Feb 25, 2024');
  });

  // Test case 6
  it('should have file list as per mock data', () => {
    const files = component.data.list.file!;
    for(let i = 0; i < (files?.length || 0); i++) {
      expect(fixture.debugElement.query(By.css(`div#fname${i}`)).nativeElement.textContent).toContain(files[i].name);
    }
  });

  // Test case 7
  it('should call downloadFile on clicking dowonload button', () => {
    const spyDownloadFile = jest.spyOn(component, 'downloadFile');
    fixture.debugElement.query(By.css(`mat-icon#fdownload0`)).nativeElement.click();

    expect(spyDownloadFile).toHaveBeenCalled();
  })
});
