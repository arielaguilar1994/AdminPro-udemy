import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { retry, map, filter } from 'rxjs/operators'

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

  subscription: Subscription;

  constructor() {
    
    this.subscription = this.regresaObservable()
    // .pipe(
    //   retry(2)
    // )
    .subscribe(
      data => console.log('Subs', data),
      error => console.error(error),
      () => console.log("El observador termino")
      );
  }

  ngOnInit() {
  }

  ngOnDestroy(){
    console.log('Estoy dejando la pantalla');
    this.subscription.unsubscribe();
  }

  regresaObservable(): Observable<any>{
    return new Observable((observer: Subscriber<any>) => {
      let contador = 0;
      let intervalo = setInterval(()=>{
        contador += 1;

        const salida = {
          valor: contador
        };

        observer.next(salida);

        //Termina el observador
        // if(contador === 3){
        //   clearInterval(intervalo);
        //   observer.complete();
        // }

        // if(contador === 2){
        //   //clearInterval(intervalo);
        //   observer.error('Error enviado del observer');
        // }

      },1000);

    }).pipe(      
      map(resp => resp.valor),
      filter( (valor, index) => {
        if((valor % 2) === 1){ //solo impares
          //impar
          return true
        }else{
          //par
          return false;
        }
      })
    );

  }

}
