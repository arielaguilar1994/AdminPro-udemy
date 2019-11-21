import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert';
import { SubirArchivoService, ModalUploadService } from 'src/app/services/service.index';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {

  imagenSubir: File;
  imagenTemp: string;

  constructor(public _archivoService: SubirArchivoService, public _modalUploadService: ModalUploadService) {
  }

  ngOnInit() {
  }

  seleccionImagen(archivo: File){
    if(!archivo){
      this.imagenSubir = null;
      return;
    }

    if(archivo.type.indexOf('image') < 0){
      swal('Solo imagenes', 'El archivo seleccionado no es una imagen', 'error');
      this.imagenSubir = null;
      return;
    }

    this.imagenSubir = archivo;
    //js puro hace un preview de la imagen seleccionada
    let reader = new FileReader();
    let urlImagenTemp = reader.readAsDataURL(archivo);

    reader.onloadend = () => this.imagenTemp = String(reader.result);
  }

  subirImagen(){
    this._archivoService.subirArchivo(this.imagenSubir, this._modalUploadService.tipo, this._modalUploadService.id)
          .then( (resp: any) => {
            swal('Imagen actualziada', resp.mensaje, 'success');
            this._modalUploadService.notificacion.emit(resp);
            this.cerrarModal();
          })
          .catch(err => console.error("Error en la carga" + err));
  }

  cerrarModal(){
    this.imagenTemp = null;
    this.imagenSubir = null;
    this._modalUploadService.ocultarModal();
  }

}
