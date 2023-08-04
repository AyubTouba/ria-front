import { Component ,OnInit} from '@angular/core';
import { NbRoleProvider } from '@nebular/security';
import { NbMenuItem, NbMenuService } from '@nebular/theme';
import { Store } from '@ngrx/store';
import { WebClientService } from 'app/@core/services/api/webclient.service';
import { Observable } from 'rxjs';

import { MENU_ITEMS } from './pages-menu';
import { getWebClients } from './state/pages.selector';
import { State } from './state/pages.state';
import * as webClientsActions from './state/webclients.actions';

@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <ngx-one-column-layout>
      <nb-menu  [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})
//implements OnInit
export class PagesComponent  {

  websites:any = {};
  menu = [];
  menuPages:Observable<[]>;
  
  constructor(private store: Store<State>,private roleProvider:NbRoleProvider ) {
   }

  
  ngOnInit(): void {
   
    this.store.dispatch(webClientsActions.LoadWebclientsData())
   
    this.roleProvider.getRole().subscribe(role => console.log(role))
    let webclientsMenu:Array<any> = [];
    webclientsMenu.push(  {
      title: 'search',
      link: '/pages/webclient/search',
    })
    this.roleProvider.getRole().subscribe(role => {
      this.store.select(getWebClients).subscribe((data) => {

        this.websites = data.map(wb => {
          webclientsMenu.push( {
            title: wb.server_name,
            link: '/pages/webclient/'+ wb._id,
          });
        });
        let newMenuItem: NbMenuItem[] = [
          {
            title: 'Home',
            icon: 'home-outline',
            link: '/pages/home',
            home: true,
          },
          {
            title: 'WEB APPLICATION',
            icon: 'browser-outline',
            children: webclientsMenu,
          
          },
          {
            title: 'USERS',
            icon: 'people-outline',
            hidden: role != 'WorkSpaceAdmin' ? true : false,
            children: [
              {
                title: 'Users',
                link: '/pages/users/list',
              },
            ],
          },
      ]
  
      this.menu = newMenuItem
    })
    })
  
  }

   
 
}
