import { AfterContentChecked, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getLoading } from './store/app.selectors';
import { AppState } from './store/app.state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterContentChecked {
  isLoading$!: Observable<boolean>;

  constructor(private store: Store<AppState>, private cdr: ChangeDetectorRef){ }

  ngOnInit() {
    this.isLoading$ = this.store.pipe(select(getLoading));
  }

  ngAfterContentChecked(): void {
    // To avoid NG0100
    this.cdr.detectChanges();
  }
}
