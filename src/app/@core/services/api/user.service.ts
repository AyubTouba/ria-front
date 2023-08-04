import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NbAuthService } from '@nebular/auth';
import { environment } from 'environments/environment';
import { ApiService } from './api.service';
import { Iuser } from './interfaces/Iuser';
import { UsertSerializer } from './interfaces/user.serialize';

@Injectable()
export class UserService extends ApiService<Iuser> {
    constructor(httpClient: HttpClient,nbAuthService: NbAuthService) {
      super(
        httpClient,
        environment.api_url,
        'workspace/user',
        new UsertSerializer(),
         nbAuthService);
    }
  }