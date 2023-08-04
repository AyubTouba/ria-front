import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NbAuthService } from '@nebular/auth';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from './api.service';
import { ILogRequest } from './interfaces/ILogRequest';
import { LogRequestSerializer } from './interfaces/log-request.serialize';

@Injectable()
export class LogRequestService extends ApiService<ILogRequest> {
    constructor( httpClient: HttpClient,nbAuthService: NbAuthService) {
      super(
        httpClient,
        environment.api_url,
        environment.logrequest_api.logrequest,
        new LogRequestSerializer(),
         nbAuthService);
    }

    getWebclientCount(params: any=null): Observable<any> {
      return this.httpClient
        .get(`${this.url}/${ environment.logrequest_api.count_webclient}`,{ params,headers: this.getCustomHeaders()   })
        .pipe(map((data: any) => this.convertData(data)));
        }
      
    getlogRequestGroupedByIlogData(id:any,params: any=null): Observable<any> {
          return this.httpClient
            .get(`${this.url}/${ environment.logrequest_api.grouby_logdata}/${id}`,{ params,headers: this.getCustomHeaders()   })
            .pipe(map((data: any) => this.convertData(data)));
            }
    getlogRequestGroupedBydate(id:any,params: any=null): Observable<any> {
              return this.httpClient
                .get(`${this.url}/${ environment.logrequest_api.grouby_date}/${id}`,{ params,headers: this.getCustomHeaders()   })
                .pipe(map((data: any) => this.convertData(data)));
                }
  }

export enum GROUPBYDATE_TYPE {
  HOUR = "hour",
  DAY = "day"
}