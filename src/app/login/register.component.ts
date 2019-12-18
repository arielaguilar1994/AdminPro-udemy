import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import swal from 'sweetalert';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';
import { Router } from '@angular/router';

//corregir problema de compilacion sweetalert
//La solución simple para compilar el proyecto Angular es Ir a la carpeta del proyecto \ node_modules \ sweetalert \ typings \ sweetalert.d.ts
//En este archivo simplemente comente la línea // const swal: SweetAlert;

declare function init_plugins();//esto es para que cierre el load de la pagina

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.css']
})
export class RegisterComponent implements OnInit {

  forma: FormGroup;

  constructor(public _usuarioService: UsuarioService, public router: Router) { }

  ngOnInit() {
    init_plugins();

    this.forma = new FormGroup({
      nombre: new FormControl(null, Validators.required),
      correo: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
      password2: new FormControl(null, Validators.required),
      condiciones: new FormControl(false)
    },{ //este segundo parametro se puede utilizar para crear validadores personalizados el cual esperan una funcion
      validators: this.sonIguales('password', 'password2')
    });

    this.forma.setValue({
      nombre: 'Test',
      correo: 'test@test.com',
      password: '123456',
      password2: '123456',
      condiciones: true
    });
  }

  sonIguales(campo1: string, campo2:string){
    //los validadores personalizados cuando es correcto se debe retornar un null, y cuando es invalido un true;
    return(group: FormGroup)=>{
      let pass1 = group.controls[campo1].value;
      let pass2 = group.controls[campo2].value;
      if(pass1 === pass2){
        return null;
      }
      return {
        sonIguales: true
      };
    }
  }

  registrarUsuario(){
    if(this.forma.invalid){
      return;
    }

    if(!this.forma.value.condiciones){
      swal("Importante!", "Debe de aceptar las condiciones", "warning");
      return;
    }

    let usuario = new Usuario(
      this.forma.value.nombre,
      this.forma.value.correo,
      this.forma.value.password
    );
    
    this._usuarioService.crearUsuario(usuario)
        .subscribe(() => this.router.navigate(['/login']),
                   err => swal(err.error.mensaje, err.error.errors.message, 'error'));
  }

}
