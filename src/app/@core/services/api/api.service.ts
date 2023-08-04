import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiSerializer } from './interfaces/api-serializer.service';
import { IResource } from './interfaces/Iresource';


export class ApiService<T extends IResource> {

  private _token;
    constructor(
        protected httpClient: HttpClient,
        protected url: string,
        protected endpoint: string,
        protected serializer: ApiSerializer,
        protected nbAuthService: NbAuthService) {

         this.nbAuthService.getToken().subscribe(token => {

          if (token.isValid()) {
            this._token = token.toString(); 
          }
         })
        }
    

      public create(item: T): Observable<T> {
        return this.httpClient
          .post<T>(`${this.url}/${this.endpoint}`, this.serializer.toJson(item),{ headers: this.getCustomHeaders()   })
          .pipe(map(data => this.serializer.fromJson(data) as T));
      }
    
      public update(item: T): Observable<T> {
        return this.httpClient
          .put<T>(`${this.url}/${this.endpoint}/${item._id}`,
            this.serializer.toJson(item),{ headers: this.getCustomHeaders()   })
          .pipe(map(data => this.serializer.fromJson(data) as T));
      }
    
      getOne(id: number): Observable<T> {
        return this.httpClient
          .get(`${this.url}/${this.endpoint}/${id}`,{ headers: this.getCustomHeaders()   })
          .pipe(map((data: any) => this.serializer.fromJson(data) as T));
      }
    
      getAll(params: any=null): Observable<T[]> {
        return this.httpClient
          .get(`${this.url}/${this.endpoint}`,{ params,headers: this.getCustomHeaders()   })
          .pipe(map((data: any) => this.convertData(data)));
      }
    
      delete(id: any) {
        return this.httpClient
          .delete(`${this.url}/${this.endpoint}/${id}`,{ headers: this.getCustomHeaders()   });
      }
    
      protected convertData(data: any): T[] {
        return data.map(item => this.serializer.fromJson(item));
      }
    
      getCustomHeaders(): HttpHeaders {
        const headers = new HttpHeaders()
          .set('Content-Type', 'application/json')
          .set('Authorization', `Bearer ${this._token}` );
        return headers;
      }
  }