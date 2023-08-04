import { createFeatureSelector, createSelector } from "@ngrx/store";
import { PagesState } from "./pages.state";

const getPagesfeatureState = createFeatureSelector<PagesState>('pages');

export const getshowCodeWeb = createSelector(
    getPagesfeatureState,
    state => state.showCodeWeb
    )

export const getWebClients = createSelector(
        getPagesfeatureState,
        state => state.websites
        )

export const getWebClientById = createSelector(
        getPagesfeatureState,
        (state, props) => {
           let dt = state.websites.filter(wb => wb['_id'] ==  props.id)[0]
           return dt ? dt : null; 
        } 
          );