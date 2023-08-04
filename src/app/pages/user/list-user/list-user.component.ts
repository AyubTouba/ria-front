import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { Store } from '@ngrx/store';
import { UserService } from 'app/@core/services/api/user.service';
import { WebClientService } from 'app/@core/services/api/webclient.service';
import { ToastrCostum, TOASTR_STATUS } from 'app/@core/utils/toastr-costum';
import { getWebClients } from 'app/pages/state/pages.selector';
import { State } from 'app/pages/state/pages.state';
import { LocalDataSource } from 'ng2-smart-table';
import { AddUserComponent } from '../add-user/add-user.component';
import { EditUserComponent } from '../edit-user/edit-user.component';

@Component({
  selector: 'ngx-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss']
})
export class ListUserComponent implements OnInit {
 
  websites:any
  settings = {
    actions: {
      columnTitle: 'Actions',
      add: false,
      edit: false,
      delete: false,
      custom: [  
      { name: 'editrecord', title:  `<i class="far fa-edit fa-xs"></i> ` },
      { name: 'deleterecord', title:  `<i class="far fa-trash-alt fa-xs"></i> ` }
    ],
    position: 'right'
     },
    // actions:false,
    
    hideSubHeader:false,
    filter:false,
    columns: {
      username: {
        title: 'Username',
        type: 'string',
      },
      email: {
        title: 'Email',
        type: 'string',
      },
      role: {
        title: 'Role',
        type: 'string',
      },
      created_at: {
        title: 'Creation Date',
        type: 'Date',
        valuePrepareFunction: (value) => {
         return  new DatePipe('en-US').transform(value, 'dd/MM/yyyy');
        }
      },
    },
  };
  source: LocalDataSource = new LocalDataSource();
  data:any; 
  constructor(private users: UserService,private dialogService: NbDialogService,
    private webClient: WebClientService,
    private toastrCostum:ToastrCostum,
    private store:Store<State>) {
    this.users.getAll().subscribe((data) => {
      this.source.load(data);
    } )
    this.store.select(getWebClients).subscribe((data) => {
      this.websites = data;
     } )
  }


  ngOnInit(): void {
  }

  createUserDialog() {
    this.dialogService.open(AddUserComponent).onClose.subscribe
    (user => user && this.source.append(user));
  }

  onCustom(event) {
    if(event.action === 'editrecord')
     {
      this.dialogService.open(EditUserComponent, {
        context: {
          user:event.data,
          websites:this.websites
        },})
      .onClose.subscribe(user => user && this.source.update(event.data,user));
     }
     if(event.action === 'deleterecord')
     {
       let status =  confirm("Are you sure you want to delete this record")
         if(status) {
           this.users.delete(event.data._id).subscribe(result => {
             this.toastrCostum.showToast(TOASTR_STATUS.SUCCESS,"Success!","delect with success")
             this.source.remove(event.data);
           })
         }
     }
  //  alert(`Custom event '${event.action}' fired on row №: ${event.data._id}`)
  }
}
