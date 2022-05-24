import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormConfig } from './form-config';

@Injectable({
  providedIn: 'root'
})
export class PiFormsService {

  constructor(private httpClient: HttpClient) { }

  getFormObject(url: string, inspectionId: any): Observable<FormConfig> {
      return this.httpClient.get<FormConfig>(`${url}/${inspectionId}`);
  }

  sendFormObject(url: string, inspectionId: any, data: any): Observable<any> {
      return this.httpClient.post(`${url}/${inspectionId}`, data);
  }
}
