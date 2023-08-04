import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';
import { Store } from '@ngrx/store';
import { Iuser } from 'app/@core/services/api/interfaces/Iuser';
import { UserService } from 'app/@core/services/api/user.service';
import { WebClientService } from 'app/@core/services/api/webclient.service';
import { ToastrCostum, TOASTR_STATUS } from 'app/@core/utils/toastr-costum';
import { getshowCodeWeb, getWebClients } from 'app/pages/state/pages.selector';
import { State } from 'app/pages/state/pages.state';
@Component({
  selector: 'ngx-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  
  createUserForm: FormGroup;
  websites;

  constructor(protected ref: NbDialogRef<AddUserComponent>,
              private webClient: WebClientService,
              private formBuilder: FormBuilder,
              private userCompanyService: UserService,
              private toastrCostum:ToastrCostum,
              private store:Store<State>) {}

  ngOnInit(): void {


    this.store.select(getWebClients).subscribe((data) => {
     this.websites = data;
    } )

    this.createUserForm = this.formBuilder.group({
      username: ['', [Validators.required,Validators.minLength(3),Validators.maxLength(10)]],
      email: ['', [Validators.required,Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      webClients: [],
      is_active: [true],
  });
  }

  get f() { return this.createUserForm.controls; }

  onSubmit() {

    // stop here if form is invalid
    if (this.createUserForm.invalid) {
        return;
    }
   let user:Iuser = this.createUserForm.value;

   this.userCompanyService.create(user).subscribe(result => {
     this.toastrCostum.showToast(TOASTR_STATUS.SUCCESS,"Success!","The user added with sucess!")
     this.ref.close(user);
   })
  }

}
