import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddUserComponent } from './add-user/add-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { ListUserComponent } from './list-user/list-user.component';
import { UserComponent } from './user.component';

const routes: Routes = [{
  path: '',
  component: UserComponent,
  children: [{
    path: 'list',
    component:ListUserComponent
  },
  {
    path: 'add',
    component:AddUserComponent
  }, ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule { }

export const routedComponents = [
    UserComponent,
    ListUserComponent,
    AddUserComponent,
    EditUserComponent,

];

export const ENTRY_COMPONENTS = [
  AddUserComponent,
  EditUserComponent
]
