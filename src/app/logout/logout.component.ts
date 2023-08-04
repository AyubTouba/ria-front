import { OnInit, Inject, Component } from "@angular/core";
import { Router } from "@angular/router";
import { NbLogoutComponent, NbAuthService, NB_AUTH_OPTIONS, NbTokenService, getDeepFromObject, NbAuthResult } from "@nebular/auth";

@Component({
  selector: 'ngx-logout',
  template:`<div>Logging out, please wait...</div>`
})
export class NgxLogoutComponent implements OnInit {

  redirectDelay: number = 0;
  strategy: string = '';

  constructor(protected service: NbAuthService,
              @Inject(NB_AUTH_OPTIONS) protected options = {},
              protected router: Router,
              private nbTokenService:NbTokenService) {
    this.redirectDelay = this.getConfigValue('forms.logout.redirectDelay');
    this.strategy = this.getConfigValue('forms.logout.strategy');
  }

  ngOnInit(): void {
    this.logout(this.strategy);
  }

  logout(strategy: string): void {
    this.nbTokenService.clear();
    setTimeout(() => {
      return this.router.navigateByUrl('/');
    }, this.redirectDelay);
    /*this.service.logout(strategy).subscribe((result: NbAuthResult) => {
        
      const redirect = result.getRedirect();
      console.log("Here :" + redirect)
      if (redirect) {
        console.log("Here go out :" )
        setTimeout(() => {
          return this.router.navigateByUrl(redirect);
        }, this.redirectDelay);
      }
    });*/
  }

  getConfigValue(key: string): any {
    return getDeepFromObject(this.options, key, null);
  }
}