import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalUploadService {
//este servicio es utilizado para comunicarse entre los componentes
//no se utiliza un output o input porque nose puede acceder directamente
  public tipo: string;
  public id: string;

  public oculto: string = 'oculto';

  public notificacion = new EventEmitter<any>();

  constructor() {
    console.log("Modal upload service listo");
  }

  ocultarModal(){
    this.oculto = 'oculto';
    this.tipo = null;
    this.id = null;
  }

  mostrarModal(tipo: string, id: string){
    this.oculto = '';
    this.tipo = tipo;
    this.id = id;
  }
}
