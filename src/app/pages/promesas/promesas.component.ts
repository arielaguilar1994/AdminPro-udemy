import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: []
})
export class PromesasComponent implements OnInit {

  constructor() {

    this.contadorSeg().then(
      success => console.log("Termino", success)
    ).catch(
      err => console.error('Error en la promesa', err)
    );
  }

  ngOnInit() {
  }

  contadorSeg(): Promise<boolean>{
    return new Promise((resolve, reject) => {
      let contador = 0;
      let intervalo = setInterval(()=>{
        contador += 1;
        if(contador === 3){
          resolve(true);
          //reject('Error en la promesa');
          clearInterval(intervalo);
        }
      }, 1000);
    });
  }

}
