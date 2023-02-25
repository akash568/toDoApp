import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { ListComponent } from './list/list.component';
import { SharedModule } from '../shared/shared.module';
import { AddUpdateListComponent } from './add-update-list/add-update-list.component';
import { ListDetailComponent } from './list-detail/list-detail.component';
import { StoreModule } from '@ngrx/store';
import { listsReducer } from './state/list.reducer';
import { LIST_STATE_NAME } from './state/list.selectors';
import { ListsEffects } from './state/list.effects';
import { EffectsModule } from '@ngrx/effects';

const routes: Route[] = [
  {
    path: '',
    component: ListComponent,
  },
];

@NgModule({
  declarations: [ListComponent, AddUpdateListComponent, ListDetailComponent],
  imports: [
    RouterModule.forChild(routes),
    StoreModule.forFeature(LIST_STATE_NAME, listsReducer),
    EffectsModule.forFeature([ListsEffects]),
    SharedModule,
  ],
})
export class ListModule {}
