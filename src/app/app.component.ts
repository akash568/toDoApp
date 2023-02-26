import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { debounceTime, Observable } from 'rxjs';
import { getLoading } from './store/app.selectors';
import { AppState } from './store/app.state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isLoading$!: Observable<boolean>;

  constructor(private store: Store<AppState>){ }

  ngOnInit() {
    // debounceTime to avoid NG0100
    this.isLoading$ = this.store.pipe(select(getLoading), debounceTime(0));
  }
}
