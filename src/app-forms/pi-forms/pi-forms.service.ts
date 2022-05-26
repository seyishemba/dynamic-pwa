import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormConfig } from './form-config';
import { FormDefinitions } from './form-definitions';

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

//   formRenderer(formObject: FormConfig): any {
//       const formFields = F
//     if (formObject.definitions.length > 0) {
//         formObject.definitions.forEach((field: FormDefinitions) => {
//             switch (field.type) {
//                 case 'enum':
//                     const values = [];
//                     field.enumValues.forEach((u, index) => values.push({ label: u, value: index }));
//                     this.formlyFields.push({
//                         key: field.label,
//                         type: 'select',
//                         className: 'd-block m-4',
//                         defaultValue: field.value,
//                         templateOptions: {
//                             label: field.label,
//                             placeholder: field.placeholder,
//                             required: field.required,
//                             options: values
//                         }
//                     });
//                     break;
//                 case 'bool':
//                     this.formlyFields.push({
//                         key: field.label,
//                         type: 'checkbox',
//                         defaultValue: field.value,
//                         className: 'd-block m-4',
//                         templateOptions: {
//                             label: field.label,
//                             placeholder: field.placeholder,
//                             required: field.required
//                         }
//                     });
//                     break;
//                 case 'string':
//                     this.formlyFields.push({
//                         key: field.label,
//                         type: 'input',
//                         defaultValue: field.value,
//                         className: 'd-block m-4',
//                         templateOptions: {
//                             label: field.label,
//                             placeholder: field.placeholder,
//                             required: field.required
//                         }
//                     });
//                     break;
//                 case 'int':
//                     this.formlyFields.push({
//                         key: field.label,
//                         type: 'input',
//                         defaultValue: field.value,
//                         className: 'd-block m-4',
//                         templateOptions: {
//                             label: field.label,
//                             placeholder: field.placeholder,
//                             required: field.required
//                         }
//                     });
//                     break;
//             }
//         });
//     }
//   }
}
