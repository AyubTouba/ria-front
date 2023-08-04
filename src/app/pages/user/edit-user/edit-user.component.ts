import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';
import {  Store } from '@ngrx/store';
import { Iuser } from 'app/@core/services/api/interfaces/Iuser';
import { UserService } from 'app/@core/services/api/user.service';
import { WebClientService } from 'app/@core/services/api/webclient.service';
import { ToastrCostum, TOASTR_STATUS } from 'app/@core/utils/toastr-costum';
import { State } from 'app/pages/state/pages.state';
import { ViewCell } from 'ng2-smart-table';

@Component({
  selector: 'ngx-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit  {
 
  @Input() user: Iuser;
  @Input() websites: any;
  editUserForm: FormGroup;

  constructor(protected ref: NbDialogRef<EditUserComponent>,
              private formBuilder: FormBuilder,
              private userCompanyService: UserService,
              private toastrCostum:ToastrCostum,
              ) {}

  ngOnInit(): void {
    this.editUserForm = this.formBuilder.group({
      username: [this.user.username, [Validators.required,Validators.minLength(3),Validators.maxLength(10)]],
      email: [this.user.email, [Validators.required,Validators.email]],
      password: ['', [Validators.minLength(6)]],
      webClients: [this.user.webClients],
      is_active: [this.user.is_active],
  });
   
  }

  get f() { return this.editUserForm.controls; }

  onSubmit() {
    // stop here if form is invalid
    if (this.editUserForm.invalid) {
        return;
    }
   let user:Iuser = {...this.user,...this.editUserForm.value};

   user.password ? user.password : delete user.password; 

   this.userCompanyService.update(user).subscribe(result => {
     this.toastrCostum.showToast(TOASTR_STATUS.SUCCESS,"Success!","The user updated with success!")
     this.ref.close(user);
   })
  }

}
