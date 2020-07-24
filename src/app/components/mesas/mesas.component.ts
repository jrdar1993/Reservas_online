import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-mesas',
  templateUrl: './mesas.component.html',
  styleUrls: ['./mesas.component.scss']
})
export class MesasComponent implements OnInit {
edmesas:any={
  nombre:'',
    espacios: 0,
    ocupada: false
};
  //declaracion de variables
  lmesas:any; //esta variable es para mostrar el listado completo de una colección
  lmesasr:any;
  //estructura sirve para hacer el insert
  mesas:any={
    nombre:'',
    espacios: 0,
    ocupada: false
  };
 

  constructor(private service:AuthService) { 
  }

  ngOnInit(): void {
    this.lista_mesas();
   
  }

  agregar(){
    this.service.agregarmesa(this.mesas);
    this.mesas.nombre='';
    this.mesas.espacios=0;
    this.mesas.ocupada=false;
    this.lista_mesas();
  }

  lista_mesas(){
    this.service.listarmesas().subscribe(mesas=>{
      this.lmesas=mesas;
      console.log(this.lmesas)
    })
  }

  
  

  eliminar(lmesas){
    this.service.eliminarmesa(lmesas);
    window.alert("Se Elimino Mesa!")
   

  }

  editar(lmesas){
    this.edmesas=lmesas;
    
    
  }
  agmesaeditada(){
   this.service.editarmesa(this.edmesas);
   window.alert("Cambio Realizado!")
  
  }

    

}
