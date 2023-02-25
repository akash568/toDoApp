import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'', pathMatch:'full', redirectTo:'todolist',
  },
  {
    path:'todolist', loadChildren: () => import('./toDo/todo.module').then(m => m.ListModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
