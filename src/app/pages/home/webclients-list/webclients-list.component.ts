import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { IwebClient } from 'app/@core/services/api/interfaces/Iwebclients';
import { WebClientService } from 'app/@core/services/api/webclient.service';
import { getWebClients } from 'app/pages/state/pages.selector';
import { State } from 'app/pages/state/pages.state';
import { LocalDataSource } from 'ng2-smart-table';

@Component({
  selector: 'ngx-webclients-list',
  templateUrl: './webclients-list.component.html',
  styleUrls: ['./webclients-list.component.scss'],
})
export class WebclientsListComponent {

  settings = {
    actions: false,
    hideSubHeader:false,
    filter:false,
    columns: {
      _id: {
        title: 'ID',
        type: 'number',
      },
      server_name: {
        title: 'Name',
        type: 'string',
      },
      domain: {
        title: 'Domain',
        type: 'string',
      },
      created_at: {
        title: 'Create Date',
        type: 'Date',
        valuePrepareFunction: (value) => {
         return  new DatePipe('en-US').transform(value, 'dd/MM/yyyy');
        }
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();
  data:IwebClient[]; 
  constructor(private store: Store<State>) {
    this.store.select(getWebClients).subscribe((data) => {
      this.source.load(data);
    } )
  
  }

 
}
