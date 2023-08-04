import { Component, OnInit,OnDestroy } from '@angular/core';
import { WebClientService } from 'app/@core/services/api/webclient.service';
import { GROUPBYDATE_TYPE, LogRequestService } from 'app/@core/services/api/logrequest.service';
import { forkJoin, Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { NbDialogService } from '@nebular/theme';
import { ListLogrequestComponent } from '../list-logrequest/list-logrequest.component';
import { SubSink } from 'subsink';
import { Store } from '@ngrx/store';
import { State } from 'app/pages/state/pages.state';
import { getWebClientById } from 'app/pages/state/pages.selector';
@Component({
  selector: 'ngx-detail-webclient',
  styleUrls: ['./detail-webclient.component.scss'],
  templateUrl: './detail-webclient.component.html',
})
export class DetailWebClientComponent implements OnInit,OnDestroy {
 
  private subs = new SubSink();
  
  website$: Observable<any>;
  webSelected:any;
  optionConfigChartRequestMethod:any =  {'series.name':'Requests method','style.height':'270px;'};
  optionConfigChartRequestStatus:any =  {'series.name':'Requests','style.height':'270px;'};
  isLoaded:boolean= false;
  getlogRequest$: Observable<any>;
  mapData:boolean = true;
  getlogRequestMethod$: Observable<any>;
  getlogRequestUserAgent$: Observable<any>;
  getlogRequestError$: Observable<any>;
  getlogRequestError500$: Observable<any>;
  getlogRequestError499$: Observable<any>;
  constructor(
              private logRequestService: LogRequestService,
              private route: ActivatedRoute,
              private dialogService: NbDialogService,
              private store: Store<State>) {

  }
  ngOnInit(): void {
    
   
    this.subs.sink =  this.route.params.subscribe(params => {

     this.website$ = this.store.select(getWebClientById,{id:params['id']});
     
     this.getlogRequest$ =this.logRequestService.getlogRequestGroupedByIlogData(params['id']);
     this.getlogRequestMethod$ =this.logRequestService.getlogRequestGroupedByIlogData(params['id'],{'groupby':'request_method'});
     this.getlogRequestUserAgent$ =this.logRequestService.getlogRequestGroupedByIlogData(params['id'],{'groupby':'user_agent'});
   
     this.getlogRequestError$ =this.logRequestService.getlogRequestGroupedBydate(params['id'],{'groupby':GROUPBYDATE_TYPE.DAY,'final_status':'404'});
     this.getlogRequestError500$ =this.logRequestService.getlogRequestGroupedBydate(params['id'],{'groupby':GROUPBYDATE_TYPE.DAY,'final_status':'500'});
     this.getlogRequestError499$ =this.logRequestService.getlogRequestGroupedBydate(params['id'],{'groupby':GROUPBYDATE_TYPE.DAY,'final_status':'499'});
     
     this.isLoaded = true;
   
   });
   
  }

 
  
  showDetailRequest(event,data){
    let dataRequest =  data[event.index].data;
   
    this.dialogService.open(ListLogrequestComponent, {
      context: {
        logRequestData:dataRequest
      },})
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
