import { createAction, props } from "@ngrx/store";
import { IwebClient } from "app/@core/services/api/interfaces/Iwebclients";

export const LoadWebclientsData = createAction('[WEBCLIENTS] LOAD DATA FROM API');

export const SuccessWebclientsData = createAction('[WEBCLIENTS] Success DATA FROM API'
,props<{webclients : IwebClient[]}>());

export const FailedWebclientsData = createAction('[WEBCLIENTS] FAILED DATA FROM API'
,props<{errorMessage : string}>());