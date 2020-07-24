import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './barra/navbar/navbar.component';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {AngularFireModule} from '@angular/fire';
import {AngularFireAuthModule} from '@angular/fire/auth';
import { from } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EnviarEmailComponent } from './auth/enviar-email/enviar-email.component';
import { AuthService } from './auth/services/auth.service';
import { CanEditGuard } from './auth/Guards/can-edit.guard';
import { CanAdminGuard } from './auth/Guards/can-admin.guard';
import { ContainerAppComponent } from './components/pages/container-app/container-app.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {MatSelectModule} from '@angular/material/select'; 
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    EnviarEmailComponent,
    ContainerAppComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }),
    NgbModule,
    
  ],
  providers: [AuthService, CanEditGuard, CanAdminGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
