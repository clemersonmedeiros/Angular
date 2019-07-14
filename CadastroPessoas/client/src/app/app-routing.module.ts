import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PersonListComponent } from './person-list/person-list.component';
import { PersonEditComponent } from './person-edit/person-edit.component';

const routes: Routes = [{ path: '', redirectTo: '/person-list', pathMatch: 'full' },
  {
    path: 'person-list',
    component: PersonListComponent
  },
  {
    path: 'person-add',
    component: PersonEditComponent
  },
  {
    path: 'person-edit/:id',
    component: PersonEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
