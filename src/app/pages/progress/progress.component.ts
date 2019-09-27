import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styles: []
})
export class ProgressComponent implements OnInit {

  progreso_Azul: number = 20;
  progreso_Verde: number = 30;
  
  constructor() { }

  ngOnInit() {
  }
  
}
