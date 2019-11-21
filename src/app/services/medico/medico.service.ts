import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';
import { UsuarioService } from '../usuario/usuario.service';
import { map } from 'rxjs/operators';
import swal from 'sweetalert';
import { Medico } from 'src/app/models/medico.model';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  constructor(public _http: HttpClient, public _usuarioService: UsuarioService) { }

  cargarMedicos(desde: number = 0){
    let url = `${URL_SERVICIOS}/medico?desde=${desde}`;

    return this._http.get(url);
  }

  buscarMedicos(serch: string){
    let url = `${URL_SERVICIOS}/busqueda/collection/medicos/${serch}`;

    return this._http.get(url).pipe(
      map((resp:any)=> resp.medicos)
    );
  }

  cargarMedico(id: string){
    let url = `${URL_SERVICIOS}/medico/${id}`;
    return this._http.get(url).pipe(
        map((resp:any)=> resp.medico)
    );
  }

  deleteMedico(id: string){
    let url = `${URL_SERVICIOS}/medico/${id}?token=${this._usuarioService.token}`;

    return this._http.delete(url).pipe(
      map((resp:any)=>{
        swal('Medico borrado', 'Medico elimiado correctamente', 'success');
        return resp.ok;
      })
    )
  }

  guardarMedico(medico: Medico){
    let url = `${URL_SERVICIOS}/medico`;

    if(medico._id){
      url += `/${medico._id}?token=${this._usuarioService.token}`;
      
      return this._http.put(url, medico).pipe(
        map((resp: any) => {
          swal('Medico creado', 'Medico guardado correctamente', 'success');
          return resp.medico;
        })
      );

    }else{
      url += `/?token=${this._usuarioService.token}`;
      return this._http.post(url, medico).pipe(
        map((resp: any)=> {
          swal('Medico creado', 'Medico guardado correctamente', 'success');
          return resp.medico;
        })
      );
    }
  }
}
