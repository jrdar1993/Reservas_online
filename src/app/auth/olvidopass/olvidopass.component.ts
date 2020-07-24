import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import {FormControl} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-olvidopass',
  templateUrl: './olvidopass.component.html',
  styleUrls: ['./olvidopass.component.scss'],
  
})
export class OlvidopassComponent implements OnInit {
  //creacion de instancia
  userEmail = new FormControl('');

  constructor(private authSvc: AuthService, private router:Router) { }

  async onReset() {

    try{
  const email= this.userEmail.value;
   await this.authSvc.resetpass(email);
    window.alert('Se envio un correo a su direccion Email');
    this.router.navigate(['/login']);

    }catch(error){console.log(error)}
    
  }


  
  ngOnInit(): void {
  }

}
