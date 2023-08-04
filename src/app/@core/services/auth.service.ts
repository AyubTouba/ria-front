import { Injectable } from '@angular/core';
import { NbAuthService } from '@nebular/auth';

@Injectable()
export class AuthService  {

    constructor(private authService: NbAuthService) {
    }
    
    isRouteAuthenticated() {
        return this.authService.isAuthenticated();
    }
 
}