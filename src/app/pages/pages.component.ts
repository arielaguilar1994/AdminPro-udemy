import { Component, OnInit } from '@angular/core';

//Esto esta declarado en custom.js ya que cuando entra del login no anda el plugin del sidebar ni nada
// esta funcion encapsulo todo lo del custom y se la llama en el pages que contiene todas las otras
// y en el login para que cargue todos los plugins
//se pueden utilizar para carruseles y cosas asi
declare function init_plugins();

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: []
})
export class PagesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    init_plugins();
  }

}
