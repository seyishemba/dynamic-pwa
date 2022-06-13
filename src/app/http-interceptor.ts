import { HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AppService } from "app/app.service";
import { TokenService } from "app/token.service";
import { BehaviorSubject, Observable, of, Subscription, throwError } from "rxjs";
import { catchError, finalize, map, switchMap } from "rxjs/operators";


@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {

  
  resolutionTime: number = 0;
  token: string;

  constructor(private AppService: AppService, private _token: TokenService) {
  }



  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      this.token = this._token.getToken();
      if (this.token) {
        const tokenizedReq = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + this.token) });
        return next.handle(tokenizedReq);
      }
      return next.handle(req);
  }


}
