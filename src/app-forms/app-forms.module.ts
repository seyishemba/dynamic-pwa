import { LightboxComponent } from './lightbox/lightbox.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppFormsRoutingModule } from './app-forms-routing.module';
import { AppFormsComponent } from './app-forms.component';
import { PiFormsComponent } from './pi-forms/pi-forms.component';
import { LightgalleryModule } from 'lightgallery/angular';

@NgModule({
  declarations: [
    AppFormsComponent,
    PiFormsComponent,
    LightboxComponent
  ],
  exports: [
      PiFormsComponent,
      LightboxComponent
  ],
  imports: [
    CommonModule,
    AppFormsRoutingModule,
    LightgalleryModule
  ]
})
export class AppFormsModule { }
