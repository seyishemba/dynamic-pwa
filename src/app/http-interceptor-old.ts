import { HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, of, Subscription, throwError } from "rxjs";
import { catchError, finalize, map, switchMap } from "rxjs/operators";
// import { TokenService } from "./pages/auth/services/token.service";
// import { ActionsService } from "./services/actions.service";
// import { CartService } from "./services/cart.service";
//private _tokenService: TokenService, private actions: ActionsService,  private cart: CartService, private readonly spinnerOverlayService: SpinnerService
//switchMap((event) => {
            //return this.handleSuccessResponse(event);
        //  }),

@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {

  
  resolutionTime: number = 0;
  token: string;


  constructor() {
  }



  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

      // var modifiedRequest = this.normalizeRequestHeaders(request);
      // return next.handle(modifiedRequest)
      //   .pipe(
      //     catchError(error => {
      //       if (error && error.status === 401) {
      //         console.log("ERROR 401 UNAUTHORIZED") ;
      //       }
      //       if (error) {
      //        // this.actions.Toast(error.statusText, error.error.error.message, 'error')
      //       }
      //       console.log("Error", error)
      //       return throwError(error);
      //     }),
          
      //     finalize(() => console.log(''))
      //   );

      this.token = 'asd';
      if (this.token) {
        const tokenizedReq = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + this.token) });
        return next.handle(tokenizedReq);
      }
      return next.handle(req);
  }



  protected normalizeRequestHeaders(request: HttpRequest<any>): HttpRequest<any> {
    var modifiedHeaders = new HttpHeaders();
    modifiedHeaders = request.headers.set("Pragma", "no-cache")
      .set("Cache-Control", "no-cache")
      .set("Expires", "Sat, 01 Jan 2000 00:00:00 GMT");

    modifiedHeaders = this.addXRequestedWithHeader(modifiedHeaders);
    modifiedHeaders = this.addAuthorizationHeaders(modifiedHeaders);


    return request.clone({
      headers: modifiedHeaders
    });
  }

  protected addXRequestedWithHeader(headers: HttpHeaders): HttpHeaders {
    if (headers) {
      headers = headers.set('X-Requested-With', 'XMLHttpRequest');
      headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    }

    return headers;
  }


  protected addAuthorizationHeaders(headers: HttpHeaders): HttpHeaders {
    let authorizationHeaders = headers ? headers.getAll('Authorization') : null;
    if (!authorizationHeaders) {
      authorizationHeaders = [];
    }

    if (!this.itemExists(authorizationHeaders, (item: string) => item.indexOf('Bearer ') == 0)) {
      //let token = this._tokenService.getToken();
      let token = 'sdsds';
      if (headers && token) {
        headers = headers.set('Authorization', 'Bearer ' + token);
      }
    }

    return headers;
  }

  protected handleSuccessResponse(event: HttpEvent<any>): Observable<HttpEvent<any>> {
    var self = this;

    if (event instanceof HttpResponse) {
      if (event.body instanceof Blob && event.body.type && event.body.type.indexOf("application/json") >= 0) {
        return this.blobToText(event.body).pipe(
          map(
            json => {
              const responseBody = json == "null" ? {} : JSON.parse(json);

              var modifiedResponse = this.handleResponse(event.clone({
                body: responseBody
              }));

              return modifiedResponse.clone({
                body: new Blob([JSON.stringify(modifiedResponse.body)], { type: 'application/json' })
              });
            })
        );
      }
    }
    return of(event);
  }



  handleResponse(response: HttpResponse<any>): HttpResponse<any> {
    var responseObj = JSON.parse(JSON.stringify(response.body));
    return responseObj;
  }

  blobToText(blob: any): Observable<string> {
    return new Observable<string>((observer: any) => {
      if (!blob) {
        observer.next("");
        observer.complete();
      } else {
        let reader = new FileReader();
        reader.onload = function () {
          observer.next(this.result);
          observer.complete();
        }
        reader.readAsText(blob);
      }
    });
  }

  private itemExists<T>(items: T[], predicate: (item: T) => boolean): boolean {
    for (let i = 0; i < items.length; i++) {
      if (predicate(items[i])) {
        return true;
      }
    }

    return false;
  }
}
