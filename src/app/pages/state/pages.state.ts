import * as AppState from  '../../state/state.interface';

export interface PagesState{
    showCodeWeb:boolean;
    websites:Array<any>;
    error: string;
}

export const initialPagesState:PagesState = {
    showCodeWeb : false,
    websites: [],
    error: ''
}

export interface State extends AppState.State {
    showCodeWeb:boolean
}