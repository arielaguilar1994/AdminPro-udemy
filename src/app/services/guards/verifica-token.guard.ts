import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class VerificaTokenGuard implements CanActivate {

  constructor(
    public _usuarioService: UsuarioService, 
    public router: Router    
    ){}

  canActivate(): Promise<boolean> | boolean {
    console.log('token guard');
    let token = this._usuarioService.token;
    let peyload = JSON.parse(atob(token.split('.')[1]));//atob es una funcion que decodifica un string en base64
    
    let expirado = this.expirado(peyload.exp);

    if(expirado){
      this.router.navigate(['/login']);
      return false;
    }

    return this.verificaRenueva(peyload.exp);

  }

  verificaRenueva(fechaExp: number): Promise<boolean>{
    return new Promise((resolve, reject)=>{

      let tokenExp = new Date(fechaExp * 1000); // cambio a milisegundos
      let ahora = new Date();

      ahora.setTime(ahora.getTime() + (4 * 60 * 60 * 1000)); 
      // console.log(tokenExp);
      // console.log(ahora);

      if(tokenExp.getTime() > ahora.getTime()){//falta mas de 4 hs para renovarlo
        resolve(true);
      }else{
        this._usuarioService.renuevaToken().subscribe(() => {
          resolve(true);
        }, () => {
          this.router.navigate(['/login']);
          reject(false);
        });
      }

      resolve(true);

    });
  }

  expirado(fechaExpiracion: number){
    //se divide en mil porque esta en milisegundos y hay que hacerlo compatible con los segundos de expiracion
    let ahora = new Date().getTime()/1000;

    if(fechaExpiracion < ahora){
      return true; //expiro
    }else{
      return false; //no expiro
    }
  }
  
}
