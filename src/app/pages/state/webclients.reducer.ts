import { createReducer, on } from "@ngrx/store"
import { initialPagesState, PagesState } from "./pages.state"
import * as webClientActions from "./webclients.actions";
import * as testActions  from "./test.actions";

export const  webclientsReducer = createReducer<PagesState>(
    initialPagesState,

    on(testActions.testToggleCheck,(state:PagesState)=> {
        console.log('Original State: ' + JSON.stringify(state))
        return {
            ...state,
            showCodeWeb : !state.showCodeWeb
        }
    }),
    on(webClientActions.LoadWebclientsData,(state:PagesState)=> {
        return {
            ...state,
        }
    }),
    on(webClientActions.FailedWebclientsData,(state:PagesState,action)=> {
        return {
            ...state,
            error : action.errorMessage
        }
    }),
    on(webClientActions.SuccessWebclientsData,(state:PagesState,action) => {
        return {
            ...state,
            websites:action.webclients
        }
    }),
    )