import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';
import { AppComponent } from './app.component';
import { AppReducer } from './store/app.reducer';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { getLoading } from './store/app.selectors';
import { By } from '@angular/platform-browser';
import { MatProgressBarModule } from '@angular/material/progress-bar';

describe('AppComponent', () => {
  let store: MockStore;
  const initialState = { showLoading: false };
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        StoreModule.forRoot({app: AppReducer}),
        MatProgressBarModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        provideMockStore({ initialState }),
      ]
    }).compileComponents();

    store = TestBed.inject(MockStore);
    
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  // Test case 1
  it('should create the app', () => {
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  // Test case 2
  it('progress bar should be visible if state is true', () => {
    store.overrideSelector(getLoading, true);
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('mat-progress-bar.progress-bar'))).toBeTruthy();
  });

  // Test case 3
  it('progress bar should not be visible if state is false', () => {
    store.overrideSelector(getLoading, false);
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('mat-progress-bar.progress-bar'))).toBeFalsy();
  })
});
