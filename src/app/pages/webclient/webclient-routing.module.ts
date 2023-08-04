import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetailWebClientComponent } from './detail-webclient/detail-webclient.component';
import { SearchWebClientComponent } from './search-webclient/search-webclient.component';
import { WebClientComponent } from './webclient.component';



const routes: Routes = [{
  path: '',
  component: WebClientComponent,
  children: [{
    path: 'search',
    component:SearchWebClientComponent
  },
  {
    path: ':id',
    component:DetailWebClientComponent
  }, ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WebClientRoutingModule { }

export const routedComponents = [
    WebClientComponent,
    SearchWebClientComponent,
    DetailWebClientComponent
];
