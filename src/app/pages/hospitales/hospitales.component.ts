import { Component, OnInit } from '@angular/core';
import { HospitalService, ModalUploadService } from 'src/app/services/service.index';
import { Hospital } from 'src/app/models/hospital.model';
import swal from 'sweetalert';
import { URL_SERVICIOS } from 'src/app/config/config';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})
export class HospitalesComponent implements OnInit {
  lstHospital: Hospital[] = [];
  desde: number = 0;
  totalRegistros: number = 0;

  constructor(public _HospitalService: HospitalService, public _modalUploadService: ModalUploadService) {
    
  }

  ngOnInit() {
    this.cargarHospitales();

    this._modalUploadService.notificacion.subscribe(()=> this.cargarHospitales())
  }

  cargarHospitales(){
    this._HospitalService.cargarHospitales(this.desde).subscribe((resp: any)=>{
      this.totalRegistros = resp.total;
      this.lstHospital = resp.hospitales;
    });
  }

  obtenerHospital(id: string){
    
  }

  buscarHospital(serch: string){
    if(serch.length <= 0){
      this.cargarHospitales();
      return;
    }

    this._HospitalService.buscarHospital(serch).subscribe((hospital: Hospital[])=>{
      this.lstHospital = hospital;
    });
  }

  crearHospital(){

    swal("Ingresa el nombre del Hospital:", {
      content: {
        element: "input"
      }
    }).then((value: string)=>{
      if(value.length){
        this._HospitalService.crearHospital(value)
              .subscribe(()=> this.cargarHospitales());
      }
    });
  }

  actualizarHospital(hospital: Hospital){
    this._HospitalService.actualizarHospital(hospital).subscribe(() => this.cargarHospitales());
  }

  deleteHospital(id: string){
    this._HospitalService.deleteHospital(id).subscribe(()=> this.cargarHospitales());
  }

  mostrarModal(idHospital: string){
    this._modalUploadService.mostrarModal('hospitales', idHospital);
  }

  cambiarDesde(valor: number){
    let desde = this.desde + valor;
    if(desde >= this.totalRegistros){
      return;
    }
    if(desde < 0){
      return;
    }
    this.desde += valor;
    this.cargarHospitales();
  }

}
