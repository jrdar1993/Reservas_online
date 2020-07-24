import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReservarRoutingModule } from './reservar-routing.module';
import { ReservarComponent } from './reservar.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';



@NgModule({
  declarations: [ReservarComponent],
  imports: [
    CommonModule,
    ReservarRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ReservarModule { }
