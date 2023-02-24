import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Route, RouterModule } from '@angular/router';
import { ListComponent } from './list/list.component';

const routes: Route[] = [
  {
    path:'', component: ListComponent
  }
]

@NgModule({
  declarations: [ListComponent],
  imports: [RouterModule.forChild(routes)],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ListModule { }
