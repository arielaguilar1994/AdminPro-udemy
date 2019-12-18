import { Injectable } from '@angular/core';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  Menu: any[] = [];

  constructor(public _usuario: UsuarioService) 
  {
  }
  
  cargarMenu(){
    this.Menu = this._usuario.menu;
  }
}
