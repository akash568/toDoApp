import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';
import { AppComponent } from './app.component';
import { AppReducer } from './store/app.reducer';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { getLoading } from './store/app.selectors';
import { By } from '@angular/platform-browser';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

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
        MatProgressSpinnerModule
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
  it('loader should be visible if state is true', () => {
    store.overrideSelector(getLoading, true);
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('div.loader-container'))).toBeTruthy();
  });

  // Test case 3
  it('loader should not be visible if state is false', () => {
    store.overrideSelector(getLoading, false);
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('div.loader-container'))).toBeFalsy();
  })
});
