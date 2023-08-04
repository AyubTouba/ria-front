import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ENTRY_COMPONENTS, routedComponents, UserRoutingModule } from './user-routing.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NbButtonModule, NbCardModule, NbCheckboxModule, NbDialogModule, NbIconModule, NbInputModule, NbLayoutModule, NbListModule, NbSelectModule, NbTabsetModule, NbUserModule, NbWindowModule } from '@nebular/theme';
import { ThemeModule } from 'app/@theme/theme.module';
import { FormsModule as ngFormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditUserComponent } from './edit-user/edit-user.component';



@NgModule({
  imports: [
    CommonModule,
    UserRoutingModule,
    ThemeModule,
    NbCardModule,
    NbUserModule,
    NbButtonModule,
    NbIconModule,
    NbTabsetModule,
    NbSelectModule,
    NbListModule,
    Ng2SmartTableModule,
    ngFormsModule,
    NbDialogModule.forChild(),
    NbWindowModule.forChild(),
    NbInputModule,
    NbCheckboxModule,
    ReactiveFormsModule
  ],
  declarations: [...routedComponents, EditUserComponent],
  entryComponents: [
    ...ENTRY_COMPONENTS,
  ],
})
export class UserModule { }
