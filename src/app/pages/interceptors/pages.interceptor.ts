import { Injectable } from "@angular/core";
import {
    HttpInterceptor,
    HttpRequest,
    HttpResponse,
    HttpErrorResponse,
    HttpHandler,
    HttpEvent
} from '@angular/common/http';

import { Observable,throwError  } from 'rxjs';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Router } from '@angular/router'
import { catchError } from "rxjs/operators";


@Injectable()
export class PagesHttpInterceptor implements HttpInterceptor {
    constructor(private router: Router){

    }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        //send the newly created request
      
       /* return next.handle(req)
            .catch(err => {
                // onError
                console.log(err);
                if (err instanceof HttpErrorResponse) {
                    if (err.status === 401) {
                        window.location.href = "/login";
                    }
                }
                return Observable.throw(err);
            }) as any;*/

        /**
         * new version of handling errors:
         */
        return next.handle(req)
        .pipe(
            catchError((error: HttpErrorResponse) => {
            let errorMsg = '';
            if (error.error instanceof ErrorEvent) {
                console.log('this is client side error');
                errorMsg = `Error: ${error.error.message}`;
            }
            else {
                if (error.status === 401) {
                    window.location.href = "/login";
                    return throwError({});
                }
                console.log('this is server side error');
                errorMsg =  this.getServerErrorMessage(error);
            }
            console.log(errorMsg);
            return throwError(errorMsg);
            })
        )
    }

    private getServerErrorMessage(error: HttpErrorResponse): string {
        switch (error.status) {
            case 404: {
                return `Not Found: ${error.message}`;
            }
            case 403: {
                return `Access Denied: ${error.message}`;
            }
            case 500: {
                return `Internal Server Error: ${error.message}`;
            }
            default: {
                return `Unknown Server Error: ${error.message}`;
            }

        }
    }
}