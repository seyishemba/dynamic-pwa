import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppFormsRoutingModule } from './app-forms-routing.module';
import { AppFormsComponent } from './app-forms.component';
import { PiFormsComponent } from './pi-forms/pi-forms.component';

@NgModule({
  declarations: [
    AppFormsComponent,
    PiFormsComponent
  ],
  imports: [
    CommonModule,
    AppFormsRoutingModule
  ]
})
export class AppFormsModule { }
