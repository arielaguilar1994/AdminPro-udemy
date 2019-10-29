import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';
import swal from 'sweetalert';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subirArchivo/subir-archivo.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  usuario: Usuario;
  token: string;
  constructor(public http: HttpClient, public router: Router, public _subirArchivoService: SubirArchivoService) {
    this.cargarStorage()
  }

  logout(){
    this.usuario = null;
    this.token = '';
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    this.router.navigate(['/login']);
  }

  loginGoogle(token: string){
    let url = URL_SERVICIOS + '/login/google';
    
    return this.http.post(url, { token: token}).pipe(
      map((resp: any) => {
        this.guardarStorage(resp.id, resp.token, resp.usuario);
        return true;
      })
    );
  }

  login(usuario: Usuario, recuerdame: boolean = false){
    if(recuerdame){
      localStorage.setItem('email', usuario.email);
    }else{
      localStorage.removeItem('email');
    }

    let url = URL_SERVICIOS + '/login';

    return this.http.post(url, usuario)
    .pipe(
      map((resp:any)=>{
        this.guardarStorage(resp.id, resp.token, resp.usuario);

        return true;
      })
    );
  }

  crearUsuario(usuario: Usuario){
    let url = URL_SERVICIOS + '/usuario';

    return this.http.post(url, usuario)
    .pipe(
      map((resp: any) => {
        swal('Usaurio creado', usuario.email, 'success');
        return resp.usuario;
      })
    )
  }

  actualizarUsuario(usuario: Usuario){
    let url = `${URL_SERVICIOS}/usuario/${usuario._id}?token=${this.token}`;
    return this.http.put(url, usuario)
    .pipe(
      map( (resp: any) => {
        this.guardarStorage(resp.usuario._id, this.token, resp.usuario);
        swal('Usuario actualizado', usuario.nombre, 'success');
        return true;
      })
    );
  }

  guardarStorage(id: string, token: string, usuario: Usuario){
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));

    //esto es para validar que el usuario esta logueado para ver el resto de las paginas
    this.usuario = usuario;
    this.token = token;
  }

  //funcion utilizada para el guard para ver si ve las paginas
  estaLogueado(){
    return (this.token.length > 5) ? true : false;
  }

  //funcion para cargar las variables en la que se fija el guard para que las tenga siemrpe cargadas
  cargarStorage(){
    if(localStorage.getItem('token')){
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
    }else{
      this.token = '';
      this.usuario = null;
    }
  }

  cambiarImagen(archivo: File, id: string){
    this._subirArchivoService.subirArchivo(archivo, 'usuarios', id)
          .then( (resp: any) => {
            this.usuario.img = resp.usuario.img;
            swal('Imagen Actualizada', this.usuario.nombre, 'success');
            this.guardarStorage(id, this.token, this.usuario);
          })
          .catch(err => {
            console.log(err);
          });
  }
}
