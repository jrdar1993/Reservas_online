import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EnviarEmailComponent } from './auth/enviar-email/enviar-email.component';

import {CanEditGuard} from './auth/Guards/can-edit.guard';
import { CanAdminGuard } from './auth/Guards/can-admin.guard';
import { CanClienteGuard } from './auth/Guards/can-cliente.guard';
import{ContainerAppComponent} from './components/pages/container-app/container-app.component'


const routes: Routes = [

{path : '', component:ContainerAppComponent, children:[
  { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) }, 
  { path: 'login', loadChildren: () => import('./auth/login/login.module').then(m => m.LoginModule) }, 
   { path: 'registrar', loadChildren: () => import('./auth/registrar/registrar.module').then(m => m.RegistrarModule) },
   {path: 'confirmacion-email', component: EnviarEmailComponent,},
  { path: 'olvidopass', loadChildren: () => import('./auth/olvidopass/olvidopass.module').then(m => m.OlvidopassModule) },
  {path:'', redirectTo:'home', pathMatch: 'full'}
]},
  
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule), canActivate:[CanAdminGuard]},
  { path: 'reservar', loadChildren: () => import('./components/reservar/reservar.module').then(m => m.ReservarModule) },
  { path: 'editor', loadChildren: () => import('./editor/editor.module').then(m => m.EditorModule), canActivate:[CanEditGuard], },
  



{ path: 'mesas', loadChildren: () => import('./components/mesas/mesas.module').then(m => m.MesasModule) },



{ path: 'calendario', loadChildren: () => import('./components/demo/demo.module').then(m => m.DemoModule) }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
