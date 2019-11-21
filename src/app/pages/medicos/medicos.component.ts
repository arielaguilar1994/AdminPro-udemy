import { Component, OnInit } from '@angular/core';
import { MedicoService, ModalUploadService } from 'src/app/services/service.index';
import { Medico } from 'src/app/models/medico.model';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: []
})
export class MedicosComponent implements OnInit {
  desde: number = 0;
  totalMedicos:number = 0;
  lstMedicos: Medico[] = [];

  constructor(public _medicoService: MedicoService, public _modalService: ModalUploadService) { }

  ngOnInit() {
    this.cargarMedicos();
  }

  cargarMedicos(){
    this._medicoService.cargarMedicos(this.desde)
            .subscribe((resp:any)=>{
              this.totalMedicos = resp.total;
              this.lstMedicos = resp.lstMedicos;
            });
  }

  buscarMedico(serch: string){
    if(serch.length <= 0){
      this.cargarMedicos();
      return;
    }

    this._medicoService.buscarMedicos(serch).subscribe((resp:Medico[])=>{
      this.lstMedicos = resp;
    });
  }

  deleteMedico(id: string){
    this._medicoService.deleteMedico(id).subscribe(() => this.cargarMedicos());
  }

  cambiarDesde(valor: number){
    let desde = this.desde + valor;
    if(desde >= this.totalMedicos){
      return;
    }
    if(desde < 0){
      return;
    }
    this.desde += valor;
    this.cargarMedicos();
  }
}
