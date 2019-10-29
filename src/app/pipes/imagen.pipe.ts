import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICIOS } from 'src/app/config/config';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, tipo: string = 'usuario'): any {
    let url = URL_SERVICIOS + '/img';

    if(!img){ //esto devuelve la no img configurada en el back
      return url + '/usuario/xxx';
    }
    //si encuentra algo con https es la imagen de google y la devuelvo
    if(img.indexOf('https')>=0){
      return img;
    }

    switch(tipo){
      case 'usuario':
        url += '/usuarios/' + img;
      break;
      case 'medico':
        url += '/medicos/' + img;
      break;
      case 'hospital':
        url += '/hospitales/' + img;
      break;
      default:
        console.log('tipo de imagen no existe, usuario, medicos, hospitales');
        url += '/usuarios/xxx';
    }

    return url;
  }

}
