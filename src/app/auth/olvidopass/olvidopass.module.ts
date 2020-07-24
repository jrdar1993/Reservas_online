import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OlvidopassRoutingModule } from './olvidopass-routing.module';
import { OlvidopassComponent } from './olvidopass.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [OlvidopassComponent],
  imports: [
    CommonModule,
    OlvidopassRoutingModule,
    ReactiveFormsModule
  ]
})
export class OlvidopassModule { }
