import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ConstantPool } from '@angular/compiler';

@Component({
  selector: 'app-reservar',
  templateUrl: './reservar.component.html',
  styleUrls: ['./reservar.component.scss']
})
export class ReservarComponent implements OnInit {
    reservas:any={
      nombre:'',
      fecha:'',
      hora:'',
      horasalida:'',
      nombremesa:''
    };
    horasalida: string;
    listadoGeneralMesas: any;

    lreservas:any;
    lmesasr:any;
    lhorario:any;
    reservasFecha:any;

    editreservas:any={
      nombre:'',
      fecha:'',
      hora:'',
      horasalida:'',
      nombremesa:''
    };

    //estructura creada para actualizar el cambo ocupada
    //según se requiera al agregar una reserva
    MesaOcupada:any={
      nombre: '', 
      espacios:0, 
      ocupada:false,
      id: ''
    };

  constructor(private servicio:AuthService) { }

  ngOnInit(): void {
    this.listar_reservas();
    this.listarMesasDisponibles();
    this.horariosrestaurantes();
    this.listar_mesas_general();
  }

  agregar(){
    console.log('metódo agregar');
    //actualiza el campo fecha salida de la estructura de reservas
    this.reservas.horasalida = this.horasalida;
      this.reservasporfecha(this.reservas.fecha);
    //agragar reserva nueva
    this.servicio.agregarreserva(this.reservas)
    console.log(this.reservas);
    //actualiza el estado de la mesa
    this.agmesaeditada();
    //Limpia los campos de form de agregar
      this.reservas.nombre='';
      this.reservas.fecha='';
      this.reservas.hora='';
      this.reservas.nombremesa='';
      this.reservas.horasalida='';
    //llena la tabla de reservas
      this.listar_reservas();

    }
    
   listar_reservas(){
      this.servicio.listarreservas().subscribe(reservas=>{
        this.lreservas=reservas;
        console.log('listar reservas');
        console.log(this.lreservas)
        
      })
    }

    listarMesasDisponibles(){
      this.servicio.listarmesasdisponibles().subscribe(mesas=>{
        this.lmesasr=mesas;
        console.log('listar mesas disponibles');
        console.log(this.lmesasr)
      })      
  }

  reservasporfecha(fecha:string){
    this.servicio.reservasporfecha(fecha).subscribe(resF=>{
      this.reservasFecha=resF;
      console.log('reservas por fecha');
      console.log(this.reservasFecha);
    })      
}

  horariosrestaurantes(){
    this.servicio.horariosrestaurante().subscribe(horario=>{
      this.lhorario=horario;
      console.log('horarios restaurante');
      console.log(this.lhorario);
    })
}

listar_mesas_general(){
  this.servicio.listarmesas().subscribe(mesas=>{
    this.listadoGeneralMesas=mesas;
    console.log('listar mesas general');
    console.log(this.listadoGeneralMesas)
  })
}




SetIdMesa(opc:number, id:string){
  if(opc==1){
    console.log('SetIdMesas llamado desde agregar reserva');
    console.log(opc+' '+id)
      this.ActualizaEstadoMesas(1, id);
  }else{
    console.log('SetIdMesas llamado desde metódo eliminar');
    this.ActualizaEstadoMesas(2, id);
  } 
};

ActualizaEstadoMesas(opc:number, IdMesa:string){
  console.log('ActualizaEstadoMesas, '+opc+' '+IdMesa);
  for(let item of this.listadoGeneralMesas){
    if(item.nombre == IdMesa){
      this.MesaOcupada.nombre = item.nombre;
      this.MesaOcupada.espacios = item.espacios;
      if(opc==1){
        this.MesaOcupada.ocupada = true;
      }else{
        this.MesaOcupada.ocupada = false;
      }
      this.MesaOcupada.id = item.id; 
      console.log('ActualizaEstadoMesas, Estructura enviada para actualizar colección mesas');
      console.log(this.MesaOcupada);
    }
  };
        
}

agmesaeditada(){
  console.log('agmesaeditada, metódo para actualizar la colección mesas');
  this.servicio.editarmesa(this.MesaOcupada);  
 }

    editar(lreservas){
      this.editreservas=lreservas;
      
      
    }

    agreservaeditada(){
      this.servicio.editarreservas(this.editreservas);
      window.alert("Cambio Realizado!")
     
     }

    
  eliminar(lreservas){
    this.SetIdMesa(2,lreservas.nombremesa)
    this.agmesaeditada();
    this.servicio.eliminarreserva(lreservas);
    window.alert("Se Elimino Reserva!")
   

  }

  onChange(valor:string){
    var hr = parseInt(valor.substring(0,2));
    hr +=2;
    var cadena = hr.toString();
    var resultado = ''
    switch (cadena.length) {
      case 1:
        resultado = '0'+cadena+':00';
        break;
      case 2:
        resultado = cadena+':00';
        break;
      default:
        resultado = '0'+cadena+':00';
        break;
    }
    this.horasalida = resultado;
    console.log(this.horasalida);
  }

  
  }
  

