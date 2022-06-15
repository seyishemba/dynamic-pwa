import { Injectable } from '@angular/core';
import { Api } from 'app/api';

@Injectable({
  providedIn: 'root'
})
export class InspectionsService {

  constructor(public API: Api) { }

  GetAll(filter){
         return this.API.doGet('services/app/Inspections/GetAll', filter)
  }
  GetInspectionForView(filter){
         return this.API.doGet('services/app/Inspections/GetInspectionForView', filter)
  }
  GetFormForView(filter){
         return this.API.doGet('services/app/Forms/GetFormForView', filter)
  }
  FormDatasCreate(){

  }
  GetFormDatas(filter){
         return this.API.doGet('services/app/FormDatas/GetAll', filter)
  }
  GetFormDatasForView(filter){
         return this.API.doGet('services/app/FormDatas/GetFormDataForView', filter)
  }

  UploadblobFile(file){
       return this.API.doPost('FileObjects/UploadblobFile', file)
  }

}
