import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from 'src/app/config/config';
import { HttpClient } from '@angular/common/http';
import { Hospital } from 'src/app/models/hospital.model';
import { map } from 'rxjs/operators';
import { UsuarioService } from '../usuario/usuario.service';
import swal from 'sweetalert';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  constructor(public _http: HttpClient, public _usuarioService: UsuarioService) { }

  cargarHospitales(desde: number = 0){
    let url = `${URL_SERVICIOS}/hospital?desde=${desde}`;
    return this._http.get(url);
  }

  obtenerHospital(id: string){
    let url = `${URL_SERVICIOS}/hospital/${id}`;
    return this._http.get(url).pipe(
        map((resp:any)=> resp.hospital)
    );
  }

  buscarHospital(serchText: string){
    let url = `${URL_SERVICIOS}/busqueda/collection/hospitales/${serchText}`;
    return this._http.get(url).pipe(
      map((resp: any)=>{
        return resp.hospitales;
      })
    );
  }

  crearHospital(nombre: string){
    let token = this._usuarioService.token;
    let url = `${URL_SERVICIOS}/hospital?token=${token}`;

    let hospital = new Hospital(nombre, null, null);

    return this._http.post(url, hospital).pipe(
      map((resp: any)=>{
        return resp.hospital;
      })
    );
  }

  actualizarHospital(hospital: Hospital){
    let token = this._usuarioService.token;
    let url = `${URL_SERVICIOS}/hospital/${hospital._id}?token=${token}`;

    return this._http.put(url, hospital).pipe(
      map((resp:any)=>{
        swal('Hospital actualizado', 'Hospital actualizado correctamente', 'success');
        return resp.ok;
      })
    );
  }

  deleteHospital(id: string){
    let token = this._usuarioService.token;
    let url = `${URL_SERVICIOS}/hospital/${id}?token=${token}`;

    return this._http.delete(url).pipe(
      map((resp: any)=>{
        swal('Hospital borrado', 'Hospital elimiado correctamente', 'success');
        return resp.ok;
      })
    );
  }
}
