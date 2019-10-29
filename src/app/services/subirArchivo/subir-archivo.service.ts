import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from 'src/app/config/config';

@Injectable({
  providedIn: 'root'
})
export class SubirArchivoService {

  constructor() { 

  }
  //AJAX puro porque angular todavia no tiene nada
  subirArchivo(archivo: File, tipo: string, id: string){
    return new Promise((resolve, reject)=>{
      let formData = new FormData();
      let xhr = new XMLHttpRequest();
      //los nombres los saco del postma upload
      formData.append('imagen', archivo, archivo.name);
  
      xhr.onreadystatechange = function(){
        if(xhr.readyState === 4){//es estado es cuando termina
          if(xhr.status === 200){
            console.log('Imagen Subida');
            resolve(JSON.parse(xhr.response));
          }else{
            console.log('Fallo la subida');
            reject(JSON.parse(xhr.response));
          }
        } 
      };

      let url = `${URL_SERVICIOS}/upload/${tipo}/${id}`;

      xhr.open('PUT', url, true);
      xhr.send(formData);
    });
  }
}
