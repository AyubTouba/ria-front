import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NbAuthService } from '@nebular/auth';
import { environment } from 'environments/environment';
import { ApiService } from './api.service';
import { IwebClient } from './interfaces/Iwebclients';
import { WebClientSerializer } from './interfaces/web-client.serialize';

@Injectable()
export class WebClientService extends ApiService<IwebClient> {
    constructor(httpClient: HttpClient,nbAuthService: NbAuthService) {
      super(
        httpClient,
        environment.api_url,
        'webclient',
        new WebClientSerializer(),
         nbAuthService);
    }
  }