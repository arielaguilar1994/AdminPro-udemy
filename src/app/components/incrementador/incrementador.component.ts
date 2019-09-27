import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: []
})
export class IncrementadorComponent implements OnInit {

  @ViewChild('txtProgress', {static: false}) txtProgress: ElementRef;

  @Input('iLeyenda') leyenda: string = "Leyenda";
  @Input('iProgreso') progreso: number = 50;

  @Output() OCambioValor: EventEmitter<number> = new EventEmitter();

  constructor() {}

  ngOnInit() {
  }

  obChanges(newValue: number){

    if(newValue >= 100){
      this.progreso = 100;
    }else if(newValue <= 0 ){
      this.progreso = 0;
    }else{
      this.progreso = newValue;
    }

    this.txtProgress.nativeElement.value = this.progreso;

    this.OCambioValor.emit(this.progreso);
  }

  CambiarValor(valor:number){
    if(this.progreso >= 100 && (valor + 5) != 0){
      return;
    }
    if(this.progreso <= 0 && (valor + 5) == 0){
      return;
    }
    this.progreso = this.progreso + valor;

    this.OCambioValor.emit(this.progreso);

    this.txtProgress.nativeElement.focus();
  }

}
