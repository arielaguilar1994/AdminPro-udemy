import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor( public _usuario: UsuarioService){

  }

  canActivate(){
    if(this._usuario.usuario.role === 'ADMIN_ROLE'){
      return true;
    }else{
      console.log('Bloqueado por el admin guard');
      this._usuario.logout();
      return false;
    }
  } 
}
