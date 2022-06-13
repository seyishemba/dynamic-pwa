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

}
