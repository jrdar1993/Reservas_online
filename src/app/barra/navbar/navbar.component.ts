import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { auth } from 'firebase';
import { Router } from '@angular/router';
import { Observable, from } from 'rxjs';
import {User} from '../../shared/models/user.interface';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  providers: [AuthService],
})
export class NavbarComponent {
  public isAdmin: boolean = false;
public isloged = false;
public user$: Observable<User>= this.authSvc.afAuth.user;
  constructor(private authSvc: AuthService, private router: Router) { }



  async onLogout(){
try {
  await this.authSvc.logout();
  this.router.navigate(['/login']);
}

catch(error){console.log(error);}

    this.authSvc.logout();

}
ngOnInit(): void {
  this.isAdmin = this.isAdmin.valueOf();
}

}
