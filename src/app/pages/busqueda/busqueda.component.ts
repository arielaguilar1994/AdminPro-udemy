import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';
import { Usuario } from 'src/app/models/usuario.model';
import { Medico } from 'src/app/models/medico.model';
import { Hospital } from 'src/app/models/hospital.model';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: []
})
export class BusquedaComponent implements OnInit {

  usuarios: Usuario[] = [];
  medicos: Medico[] = [];
  hospitales: Hospital[] = [];

  constructor(public activateRoute: ActivatedRoute, public http: HttpClient, public router: Router) {
    activateRoute.params.subscribe(params => {
      let termino = params['termino'];
      this.buscar(termino);
    });
  }

  ngOnInit() {
  }

  buscar(termino: string){
    let url = `${URL_SERVICIOS}/busqueda/todo/${termino}`;
    this.http.get(url).subscribe((resp: any) => {
      this.hospitales = resp.hospitales;
      this.medicos = resp.medicos;
      this.usuarios = resp.usuarios;
    });
  }

}
