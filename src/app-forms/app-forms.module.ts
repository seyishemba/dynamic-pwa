import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppFormsRoutingModule } from './app-forms-routing.module';
import { AppFormsComponent } from './app-forms.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyPrimeNGModule } from '@ngx-formly/primeng';
import { PiFormsComponent } from './pi-forms/pi-forms.component';

@NgModule({
  declarations: [
    AppFormsComponent,
    PiFormsComponent
  ],
  imports: [
    CommonModule,
    AppFormsRoutingModule,
    ReactiveFormsModule,
    FormlyModule,
    FormlyPrimeNGModule
  ]
})
export class AppFormsModule { }
