import { Injectable } from '@angular/core';
import {first, switchMap} from 'rxjs/operators';
import {auth} from 'firebase/app';
import {AngularFireAuth} from '@angular/fire/auth';
import { User } from "../../shared/models/user.interface";
import { from, Observable, of } from 'rxjs';
import {AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection} from '@angular/fire/firestore';
import {RoleValidator} from '../../auth/Helpers/roleValidator';
import { Time, DatePipe } from '@angular/common';
import { map } from 'rxjs/operators';
import { parse } from 'date-fns';



/* export interface Item{nombre: string; fecha: Date; hora: Time } */
export interface mesas{nombre: string; espacios:number, ocupada:boolean}
export interface reservas{nombre: string; fecha: Date; hora: Time; horasalida: Time; nombremesa: string}
export interface horariorest{hora:string}


@Injectable({ providedIn: 'root'})

export class AuthService extends RoleValidator{
  private mesasCollection: AngularFirestoreCollection<mesas>;
  private mesasDoc: AngularFirestoreDocument<mesas>;
  private reservasCollection: AngularFirestoreCollection<reservas>;
  private reservasDoc: AngularFirestoreDocument<reservas>;
  private horariosrestCollection: AngularFirestoreCollection<horariorest>;


  mesas: Observable<mesas[]>;
  lmesas: Observable<mesas[]>;
  reservas: Observable<reservas[]>;
  lreservas:Observable<reservas[]>;
  lresF:Observable<reservas[]>;
  horariorest:Observable<horariorest[]>;


  public user$: Observable<User>;


constructor(public afAuth: AngularFireAuth, private afs: AngularFirestore){
  
    super();
    //************************GESTION MESAS ADD,EDIT,DELETE*************** */

    // agregar nueva coleccion mesas
    this.mesasCollection=afs.collection<mesas>('mesas');
    this.mesas = this.mesasCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as mesas;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
    
    //listar coleccion mesas
    /* this.mesasCollection=afs.collection<mesas>('mesas');
    this.lmesas = this.mesasCollection.valueChanges(); */


      //eliminar mesas

    this.user$ = this.afAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
         return this.afs.doc<User>(`users/${user.uid}`).valueChanges(); 
        }
        return of(null);
      })
    );

//*****************GESTION RESERVAS ADD,EDIT,DELETE******************* */

// agregar reserva
this.reservasCollection=afs.collection<reservas>('reservas');
this.reservas = this.reservasCollection.snapshotChanges().pipe(
  map(actions => actions.map(a => {
    const data = a.payload.doc.data() as reservas;
    const id = a.payload.doc.id;
    return { id, ...data };
  }))
);

//listar coleccion reservas
this.reservasCollection=afs.collection<reservas>('reservas');
this.lreservas = this.reservasCollection.valueChanges();

  //eliminar reservas

this.user$ = this.afAuth.authState.pipe(
  switchMap((user) => {
    if (user) {
     return this.afs.doc<User>(`users/${user.uid}`).valueChanges(); 
    }
    return of(null);
  })
);


  }

  //***********************GESTION DE LOGIN Y CREACION USUSARIO**************************** */

  async loginGoogle(){
    try{
      const {user} = await this.afAuth.signInWithPopup(new auth.GoogleAuthProvider());
this.updateUserData(user);
return user
    }

    catch(error){console.log(error)}

  }

 async resetpass(email:string):Promise<void>{
try{
  return this.afAuth.sendPasswordResetEmail(email);
}
catch(error){console.log(error)}
 }

  async verificaremail():Promise<void>{
    return ( await this.afAuth.currentUser).sendEmailVerification();
  }

  async login(email:string, password:string): Promise<User>{
    try{
      const {user} = await this.afAuth.signInWithEmailAndPassword(email,password);
       /* this.updateUserData(user); */
      return user;
    }
    catch (error){console.log(error)}
    
  }

  async registrar(email: string, password: string): Promise<User>{

    try{
      const {user} = await this.afAuth.createUserWithEmailAndPassword(email,password);
      this.verificaremail();
      this.updateUserDataadmin(user);
      return user;
    }
    catch(error){console.log(error)}
    
  }


  async logout(){
    try{
      await this.afAuth.signOut();
    }catch (error){console.log(error)}
    
  }



   obtenerusuario(){

    return this.afAuth.authState.pipe(first()).toPromise();
   }

   private updateUserData(user:User){
     const userRef: AngularFirestoreDocument<User>=
     this.afs.doc(`users/${user.uid}`);

     const data:User = {
       uid: user.uid,
       email: user.email,
       emailVerified: user.emailVerified,
       displayName: user.displayName,
       photoURL: user.photoURL,
       role: 'CLIENTE'
      
           };

           return userRef.set(data, {merge: true});
   }

   private updateUserDataadmin(user:User){
    const userRef: AngularFirestoreDocument<User>=
    this.afs.doc(`users/${user.uid}`);

    const data:User = {
      uid: user.uid,
      email: user.email,
      emailVerified: user.emailVerified,
      displayName: user.displayName,
      photoURL: user.photoURL,
      role: 'ADMIN'
     
          };

          return userRef.set(data, {merge: true});
  }

 //***********************GESTION DE LOGIN Y CREACION USUSARIO*************************** */


agregarmesa(mesas:mesas){
  this.mesasCollection.add(mesas);
}

listarmesas(){
  //return this.lmesas;
  return this.mesas
}

listarmesasdisponibles(){   
  /* this.mesasCollection=this.afs.collection<mesas>('mesas');
  this.lmesas = this.mesasCollection.snapshotChanges().pipe(
    map(actions => actions.filter(a => a.payload.doc.data().ocupada == false).map(a => {
      const data = a.payload.doc.data() as mesas;
      const id = a.payload.doc.id;
      return { id, ...data };
    })),
  ); */
  this.mesasCollection=this.afs.collection<mesas>('mesas');
  this.lmesas = this.mesasCollection.snapshotChanges().pipe(
    map(actions => actions.map(a => {
      const data = a.payload.doc.data() as mesas;
      const id = a.payload.doc.id;
      return { id, ...data };
    })),
  );
  return this.lmesas;
}

horariosrestaurante(){   

  this.horariosrestCollection=this.afs.collection<horariorest>('horariorest');
  this.horariorest = this.horariosrestCollection.valueChanges();

  return this.horariorest;
}

editarmesa(mesas){
  this.mesasDoc=this.afs.doc<mesas>(`mesas/${mesas.id}`);
  this.mesasDoc.update(mesas);
}

actualizaEstadoMesa(mesas){
  this.mesasDoc=this.afs.doc<mesas>(`mesas/${mesas.id}`);
  const data:mesas ={
    nombre: mesas.nombre,
    espacios: mesas.espacios,
    ocupada: true,
  }
  this.mesasDoc.update(data);
}

eliminarmesa(mesas){
  this.mesasDoc=this.afs.doc<mesas>( `mesas/${mesas.id}`);
  this.mesasDoc.delete();
 }

  reservasporfecha(fecha:string){
    console.log('tramo 1');
    console.log(fecha);
  this.reservasCollection=this.afs.collection<reservas>('reservas');
  this.lresF = this.reservasCollection.snapshotChanges().pipe(
    map(actions => actions.filter(a => a.payload.doc.data().fecha.toString() == fecha).map(a => {
      const data = a.payload.doc.data() as reservas;
      console.log('tramo 2');
      console.log(a.payload.doc.data().fecha.toString());
      const id = a.payload.doc.id;
      return { id, ...data };
    })),
  );
return this.lresF;
 }

agregarreserva(reservas:reservas){
  this.reservasCollection.add(reservas);
}
listarreservas(){
  return this.reservas
}

editarreservas(reservas){
  this.reservasDoc=this.afs.doc<reservas>(`reservas/${reservas.id}`);
  this.reservasDoc.update(reservas);
}

eliminarreserva(reservas){
  this.reservasDoc=this.afs.doc<reservas>( `reservas/${reservas.id}`);
  this.reservasDoc.delete();
 }
   
}
   