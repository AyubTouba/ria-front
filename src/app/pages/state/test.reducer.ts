import { createAction, createReducer, on } from "@ngrx/store";
import { initialPagesState, PagesState } from "./pages.state";
import * as testActions  from "./test.actions";



export const  testReducer = createReducer<PagesState>(
    initialPagesState,
    on(testActions.testToggleCheck,(state:PagesState)=> {
        console.log('Original State: ' + JSON.stringify(state))
        return {
            ...state,
            showCodeWeb : !state.showCodeWeb
        }
    })
    )