import { Component, OnInit, Input } from '@angular/core';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';

@Component({
  selector: 'app-grafica',
  templateUrl: './grafica.component.html',
  styles: []
})
export class GraficaComponent implements OnInit {

  @Input('iGrafico') Grafico: any = {};

  public txtLabels: Label[] = [];
  public dataGrafico: MultiDataSet = [];
  public graficType: ChartType = 'doughnut';

  constructor() { }

  ngOnInit() {
    this.txtLabels = this.Grafico.labels;
    this.dataGrafico = [this.Grafico.data];
    this.graficType = this.Grafico.type;
  }

}
