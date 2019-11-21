import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Hospital } from '../../models/hospital.model';
import { MedicoService, HospitalService, ModalUploadService } from 'src/app/services/service.index';
import { Medico } from 'src/app/models/medico.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: []
})
export class MedicoComponent implements OnInit {
  hospitales: Hospital[] = [];
  medico: Medico = new Medico('','','','','');
  hospital: Hospital = new Hospital('');

  constructor(public _medicoService: MedicoService, 
    public _modalService: ModalUploadService,
    public _hospitalService: HospitalService,
    public _router: Router,
    public activateRoute: ActivatedRoute) { 
      activateRoute.params.subscribe(params =>{
        let id = params['id'];

        if(id !== 'nuevo'){
          this.cargarMedico(id);
        }
      });
    }

  ngOnInit() {
    this._hospitalService.cargarHospitales().subscribe((resp: any)=>this.hospitales = resp.hospitales);
    this._modalService.notificacion.subscribe(resp => {
          this.medico.img = resp.medico.img;
    });
  }

  guardarMedico(form: NgForm){
    if(form.invalid){
      return;
    }

    this._medicoService.guardarMedico(this.medico).subscribe((resp: any)=>{
      this.medico._id = resp._id;
      this._router.navigate(['/medico', resp._id]);
    });
  }

  cambioHospital(id: string){
    this._hospitalService.obtenerHospital(id)
    .subscribe(resp => {this.hospital = resp});
  }

  cargarMedico(id: string){
    this._medicoService.cargarMedico(id).subscribe((resp:any) => {
      this.medico = resp
      this.medico.hospital = resp.hospital._id;
      this.cambioHospital(this.medico.hospital);
    });
  }

  mostrarModal(){
    this._modalService.mostrarModal('medicos', this.medico._id);
  }

}
