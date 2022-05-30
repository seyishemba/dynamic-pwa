import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LightboxService {

  constructor(private httpClient: HttpClient) { }

  upload(images: any): Observable<any> {
      return this.httpClient.post(`your url goes here`, images);
  }
}
