import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MesasRoutingModule } from './mesas-routing.module';
import { MesasComponent } from './mesas.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [MesasComponent],
  imports: [
    CommonModule,
    MesasRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class MesasModule { }
