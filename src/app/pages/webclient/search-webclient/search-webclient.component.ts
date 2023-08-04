import { Component } from '@angular/core';
import { WebClientService } from 'app/@core/services/api/webclient.service';
import { LogRequestService } from 'app/@core/services/api/logrequest.service';
import { OptionConfig } from 'app/shared/components/bar-chart/option-config';
import { forkJoin } from 'rxjs';
import { ToastrCostum, TOASTR_STATUS } from 'app/@core/utils/toastr-costum';
@Component({
  selector: 'ngx-search-webclient',
  styleUrls: ['./search-webclient.component.scss'],
  templateUrl: './search-webclient.component.html',
})
export class SearchWebClientComponent {

  websites: Array<any>
  isSelected: boolean;
  webApplicationSelected:any;
  webSelected:any;
  logRequests:any;
  methodRequests:any;
  optionConfigChartRequestMethod:any;
  constructor(private webClient: WebClientService,private logRequestService: LogRequestService,
    private toastrCostum:ToastrCostum) {
    this.optionConfigChartRequestMethod = {'series.name':'Requests method','style.height':'270px;'}
    this.webClient.getAll().subscribe((data) => {
        this.websites = data ;
    } )
  
  }

  webAppSelected(event) {
    this.webSelected = event;
  }
 
  detail(){
     if(this.webSelected != null) {
       
      this.webApplicationSelected = this.webSelected;
      this.webApplicationSelected.created_at = this.webApplicationSelected.created_at.split("T")[0];

      let getlogRequest =this.logRequestService.getlogRequestGroupedByIlogData(this.webApplicationSelected._id)
      let getlogRequestMethod =this.logRequestService.getlogRequestGroupedByIlogData(this.webApplicationSelected._id,{'groupby':'request_method'})

      forkJoin([getlogRequest, getlogRequestMethod]).subscribe(results => {
        let responseDataStatus:any = results[0];
        let responseDataMethod:any = results[1];
        responseDataStatus = responseDataStatus.map((data:any) =>({value:data.data,name:data._id}));
        responseDataMethod = responseDataMethod.map((data:any) =>({value:data.data,name:data._id}));
        this.logRequests = responseDataStatus;
        this.methodRequests= responseDataMethod ;
        this.isSelected = true;
      });
       
        
     }else {
      this.isSelected = false;
      this.toastrCostum.showToast(TOASTR_STATUS.WARNING,"Warning!","Please choose one")

     }
  }
}
