import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';
import swal from 'sweetalert';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subirArchivo/subir-archivo.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  usuario: Usuario;
  token: string;
  menu: any[] = [];

  constructor(public http: HttpClient, public router: Router, public _subirArchivoService: SubirArchivoService) {
    this.cargarStorage()
  }

  logout(){
    this.usuario = null;
    this.token = '';
    this.menu = [];
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('menu');
    this.router.navigate(['/login']);
  }

  loginGoogle(token: string){
    let url = URL_SERVICIOS + '/login/google';
    
    return this.http.post(url, { token: token}).pipe(
      map((resp: any) => {
        this.guardarStorage(resp.id, resp.token, resp.usuario, resp.menu);
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
        this.guardarStorage(resp.id, resp.token, resp.usuario, resp.menu);
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
        if(usuario._id === this.usuario._id){
          this.guardarStorage(resp.usuario._id, this.token, resp.usuario, this.menu);
        }
        
        swal('Usuario actualizado', usuario.nombre, 'success');
        return true;
      })
    );
  }

  cargarUsuarios(desde: number = 0){
    let url = `${URL_SERVICIOS}/usuario?desde=${desde}`;

    return this.http.get(url);
  }

  buscarUsuarios(serch: string){
    let url = `${URL_SERVICIOS}/busqueda/collection/usuarios/${serch}`;

    return this.http.get(url)
                  .pipe(
                    map((resp: any) => resp.usuarios )
                  );
  }

  borrarUsuario(id: string){
    let url = `${URL_SERVICIOS}/usuario/${id}?token=${this.token}`;

    return this.http.delete(url)
                .pipe(
                  map( () => {
                    swal('Usuario borrado', 'El usuario a sido eliminado correctamente', 'success');
                    return true;
                  })
                );
  }

  guardarStorage(id: string, token: string, usuario: Usuario, menu: any){
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
    localStorage.setItem('menu', JSON.stringify(menu));

    //esto es para validar que el usuario esta logueado para ver el resto de las paginas
    this.usuario = usuario;
    this.token = token;
    this.menu = menu;
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
      this.menu = JSON.parse(localStorage.getItem('menu'));
    }else{
      this.token = '';
      this.usuario = null;
      this.menu = null;
    }
  }

  cambiarImagen(archivo: File, id: string){
    this._subirArchivoService.subirArchivo(archivo, 'usuarios', id)
          .then( (resp: any) => {
            this.usuario.img = resp.usuario.img;
            swal('Imagen Actualizada', this.usuario.nombre, 'success');
            this.guardarStorage(id, this.token, this.usuario, this.menu);
          })
          .catch(err => {
            console.log(err);
          });
  }
}
