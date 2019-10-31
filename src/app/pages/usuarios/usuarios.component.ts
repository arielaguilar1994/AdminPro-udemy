import { Component, OnInit } from '@angular/core';
import { UsuarioService, ModalUploadService } from 'src/app/services/service.index';
import { Usuario } from 'src/app/models/usuario.model';
//import swal from 'sweetalert';

declare var swal: any;

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {

  usuarios: Usuario [] = [];
  desde: number = 0;
  totalRegistros: number = 0;
  cargando: boolean = true;

  constructor(public _usuarioService: UsuarioService, public _modalUploadService: ModalUploadService) { }

  ngOnInit() {
    this.cargarUsuarios();

    this._modalUploadService.notificacion.subscribe(()=> this.cargarUsuarios())
  }

  cargarUsuarios(){
    this.cargando = true;

    this._usuarioService.cargarUsuarios(this.desde)
              .subscribe((resp:any)=>{
                console.log(resp);
                this.totalRegistros = resp.total;
                this.usuarios = resp.usuarios;

                this.cargando = false;
              });
  }

  cambiarDesde(valor: number){
    let desde = this.desde + valor;
    if(desde >= this.totalRegistros){
      return;
    }
    if(desde < 0){
      return;
    }
    this.desde += valor;
    this.cargarUsuarios();
  }

  buscarUsuario(serch: string){
    if(serch.length <= 0){
      this.cargarUsuarios();
      return;
    }
    this.cargando = true;
    this._usuarioService.buscarUsuarios(serch)
    .subscribe((usuarios: Usuario[])=>{
      this.usuarios = usuarios;
      this.cargando = false;
    });
  }

  borrarUsuario(usuario: Usuario){
    if(usuario._id === this._usuarioService.usuario._id){
      swal('No puede borrar usuario', 'No se puede borrar a si mismo', 'error');
      return;
    }

    swal({
      title: '¿Esta seguro?',
      text: 'Esta a punto de borrar a ' + usuario.nombre,
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
    .then( borrar => {
      if (borrar) {
        this._usuarioService.borrarUsuario(usuario._id)
                .subscribe(borrado => {
                  this.cargarUsuarios();
                })
      }
    });
  }

  guardarCambios(usuario: Usuario){
    this._usuarioService.actualizarUsuario(usuario)
            .subscribe();
  }

  mostrarModal(idUsuario: string){
    this._modalUploadService.mostrarModal('usuarios', idUsuario);
  }

}
