import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { LocalDataSource } from 'ng2-smart-table';

@Component({
  selector: 'ngx-list-logrequest',
  templateUrl: './list-logrequest.component.html',
  styleUrls: ['./list-logrequest.component.scss']
})
export class ListLogrequestComponent implements OnInit {
 
  @Input() logRequestData: any;
  settings = {
    
    actions:false,
    hideSubHeader:true,
    filter:false,
    columns: {
      'logs.TIME_REQUEST': {
        title: 'Date request',
        type: 'Date',
        valuePrepareFunction: (cell, row) => { return row.logs.TIME_REQUEST.split("+")[0] }
      },
      'logs.REFERER': {
        title: 'Url',
        type: 'string',
        valuePrepareFunction: (cell, row) => { return row.logs.REFERER.replaceAll('"',"") }
      },
      'logs.REQUEST_METHOD': {
        title: 'request method',
        type: 'string',
        valuePrepareFunction: (cell, row) => { return row.logs.REQUEST_METHOD }
      },
      'logs.REMOTE_USER': {
        title: 'ip user',
        type: 'string',
        valuePrepareFunction: (cell, row) => { return row.logs.REMOTE_USER }
      },
      'logs.USER_AGENT': {
        title: 'Browser',
        type: 'string',
        valuePrepareFunction: (cell, row) => { return row.logs.USER_AGENT.split(" ")[0].replaceAll('"',"") }
      },
      'logs.BYTES_SENT': {
        title: 'Bytes sent',
        type: 'string',
        valuePrepareFunction: (cell, row) => { return row.logs.BYTES_SENT  + 'bytes' }
      },
      'logs.BYTES_RECEIVED': {
        title: 'Bytes received',
        type: 'string',
        valuePrepareFunction: (cell, row) => { return row.logs.BYTES_RECEIVED + 'bytes' }
      },
      'logs.TIME_SERVIR_REQUEST': {
        title: 'Time servir request',
        type: 'string',
        valuePrepareFunction: (cell, row) => { return row.logs.TIME_SERVIR_REQUEST + 's' }
      }
    },
  };
  source: LocalDataSource = new LocalDataSource();
  constructor(protected ref: NbDialogRef<ListLogrequestComponent>){
    
 
  }

  ngOnInit(): void {
     this.source.load(this.logRequestData);
     this.source.setPaging(1,8, true);
  }

  close(){
    this.ref.close();
  }

}
