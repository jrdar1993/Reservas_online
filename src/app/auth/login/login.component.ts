import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import {User} from '../../shared/models/user.interface';  

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],

})
export class LoginComponent implements OnInit {
  loginForm= new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
    
  });
  constructor(private authSvc: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

   async onGoogleLogin(){
     try{
       const user = await this.authSvc.loginGoogle();
       if(user){
this.validarusuarioverificado(user);
       }
      this.router.navigate(['/home']);
     }catch(error){console.log(error)}

  }
  async onLogin(){
    const{email, password} = this.loginForm.value;
    try{
      
      const user = await this.authSvc.login(email, password);
    this.validarusuarioverificado(user);
    }
 catch(error){console.log(error);
}
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
  }
}
