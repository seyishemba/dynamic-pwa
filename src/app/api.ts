import { HttpClient, HttpParams } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { BASE_URL } from "./values";


@Injectable({
  providedIn: 'root'
})
export class Api {

  constructor(private http: HttpClient, @Inject(BASE_URL) private baseUrl: string) {

  }


  get<T>(url: string, params?: Map<string, any>): Observable<T> {
    params=params?params:new Map<string,any>();
    let _params = this.buildParams(params);
    let _url = this.getUrl(url);
    return this.http.get(_url, { params: _params }).pipe(map((res: any) => {
      return res.result;
    }));

  }

  post<T>(url: string, data?: T): Observable<T> {
    let _url = this.getUrl(url);
    let payload = data ? JSON.stringify(data) : undefined;
    return this.http.post<T>(_url, payload);
  }

  put<T>(url: string, data: T): Observable<T> {
    let _url = this.getUrl(url);
    let payload = JSON.stringify(data);
    return this.http.put<T>(_url, payload);
  }

  delete<T>(url: string, params: Map<string, string>): Observable<any> {
    let _params = this.buildParams(params);
    let _url = this.getUrl(url);
    return this.http.delete<T>(_url, { params: _params });
  }

  private buildParams(params: Map<string, string>) {
    let _params = new HttpParams();
    for (let entry of params.entries()) {
      const key = entry[0];
      const value = entry[1];
      _params = _params.append(key, value);
    }

    return _params;
  }

  private getUrl(url: string) {
    return `${this.baseUrl}/${url}`;
  }
}
