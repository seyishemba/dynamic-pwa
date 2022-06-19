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
  createFile(data){
 this.API.doPost("services/app/FileObjects/CreateOrEdit", data).subscribe(
        result => console.log(result),
        err => console.log(err)
      );

}

  UploadblobFile(file){
       var imageData={
              "file" : file 
       }
       return this.API.doBinaryPost('/FileObjects/UploadblobFile', imageData)
  }

}
