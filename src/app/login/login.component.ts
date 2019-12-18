import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';

declare function init_plugins();
declare const gapi: any;
declare var swal: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  recuerdame: boolean = false;
  email: string;

  auth2: any;

  constructor(public router: Router, public _usuarioService: UsuarioService) { }

  ngOnInit() {
    init_plugins();
    this.googleInit();
    this.email = localStorage.getItem('email') || ''; //si no cumple el primero coloco el segundo
    if(this.email.length > 1){
      this.recuerdame = true;
    }
  }

  googleInit(){
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '144804356267-2bf7ois2p7lm2pslhaof3997uqr9kv15.apps.googleusercontent.com',
        cookiepolicy: 'single-host-origin',
        scope: 'profile email'
      });

      this.attachSignIn(document.getElementById('btnGoogle'));
    });
  }

  attachSignIn(element){
    this.auth2.attachClickHandler(element, {}, (googleUser) => {
      //perfil obtenido de google
      //let profile = googleUser.getBasicProfile();
      //console.log(profile);

      let token = googleUser.getAuthResponse().id_token;
      console.log('Token obtenido de google', token);
      this._usuarioService.loginGoogle(token)
                .subscribe( () => window.location.href = '#/dashboard');
                //se hace de esta forma la redireccion porque se rompe el template
                //de esta forma se redirige a esta pagina
    });
  }

  ingresar(forma: NgForm){
    if(!forma.valid){
      return;
    }

    let usuario = new Usuario(null, forma.value.email, forma.value.password);

    this._usuarioService.login(usuario, forma.value.recuerdame)
            .subscribe( () => this.router.navigate(['/dashboard']), 
                        err => swal('Error en login', err.error.mensaje, 'error'));
  }



}
