import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';
import { User } from 'firebase';
import {OnDestroy} from '@angular/core';

@Component({
  selector: 'app-enviar-email',
  templateUrl: './enviar-email.component.html',
  styleUrls: ['./enviar-email.component.scss'],
  
})
export class EnviarEmailComponent implements OnDestroy  {
  public user$: Observable<User>= this.authSvc.afAuth.user;

  constructor(private authSvc: AuthService) { }

  onEnviarEmail(){
    this.authSvc.verificaremail();
  }

ngOnDestroy(){
  this.authSvc.logout();
}
  

}
