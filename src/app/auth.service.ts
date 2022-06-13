import { Injectable } from '@angular/core';
import { Api } from 'app/api';
import { TokenService } from "app/token.service";
import { finalize, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { Router, ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( public API: Api, public router: Router, private _token: TokenService) { }

  login(user, password){

       var  LoginData = {
          "captchaResponse": null,
          "password": password,
          "rememberClient": false,
          "returnUrl": null,
          "singleSignIn": false,
          "userNameOrEmailAddress": user
      }
    this.API.doPost("TokenAuth/Authenticate", LoginData).subscribe(
        result => this.ComponentDashboard(result),
        err => console.log(err)
      );
  }

  ComponentDashboard(result){
    this._token.setToken(result.result.accessToken);
    this.router.navigate(['component-dashboard'])
  }




}
