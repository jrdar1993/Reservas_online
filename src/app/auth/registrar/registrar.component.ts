import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AuthService} from './../services/auth.service';
import { Router } from '@angular/router';
import {User} from '../../shared/models/user.interface';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.scss'],
  
})
export class RegistrarComponent {
  registrarForm= new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
    
  });

  constructor(private authSvc: AuthService, private router: Router) { }

 
async onRegistrar(){
  const {email, password} = this.registrarForm.value;
  
  try {const user = await this.authSvc.registrar(email, password);

    if (user) {
      this.validarusuarioverificado(user);
    }
  }
  catch(error){console.log(error) }
}

private validarusuarioverificado(user:User){
  if(user && user.emailVerified){
    this.router.navigate(['/home']);
    
    //redirecciona despues de logearse a la url que yo quier
         
  }else if (user){
    this.router.navigate(['/confirmacion-email']);
  }else{
    this.router.navigate(['/registrar']);

  }
}}