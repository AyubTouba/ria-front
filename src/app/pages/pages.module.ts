import { NgModule } from '@angular/core';
import { NbMenuModule } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { PagesRoutingModule } from './pages-routing.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { StoreModule } from '@ngrx/store';
import { testReducer } from './state/test.reducer';
import { WebclientEffect } from './state/webclient.effect';
import { EffectsModule } from '@ngrx/effects';
import { webclientsReducer } from './state/webclients.reducer';
import { PagesHttpInterceptor } from './interceptors/pages.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    MiscellaneousModule,
    StoreModule.forFeature('pages',webclientsReducer),
    EffectsModule.forFeature([WebclientEffect])
  ],
  declarations: [
    PagesComponent,
  ],
})
export class PagesModule {
}
