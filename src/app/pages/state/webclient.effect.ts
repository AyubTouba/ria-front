import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { WebClientService } from "app/@core/services/api/webclient.service";
import { of } from "rxjs";
import { mergeMap,map, catchError } from "rxjs/operators";
import * as webClientActions from "./webclients.actions";

@Injectable()
export class WebclientEffect {
    
     constructor(private actions$ : Actions,private webclientService : WebClientService)
      {}

      loadWebclients$ = createEffect(() => {
         return this.actions$.pipe(
             ofType(webClientActions.LoadWebclientsData),
             mergeMap(() => this.webclientService.getAll().pipe(
                 map(webclients => webClientActions.SuccessWebclientsData({webclients})),
                 catchError(error => of(webClientActions.FailedWebclientsData({errorMessage:error})) )
             ) )
         )
      });
}