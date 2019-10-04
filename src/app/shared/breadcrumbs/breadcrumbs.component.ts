import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Title, Meta, MetaDefinition } from '@angular/platform-browser';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: []
})
export class BreadcrumbsComponent implements OnInit {

  titulo: string;

  constructor(private route: Router, private title: Title, private meta: Meta) {
    this.getDataRoute().subscribe(data =>{
      console.log(data);
      this.titulo = data.titulo;
      this.title.setTitle(this.titulo);//esto es una propiedad de angular que cambia el titulo en la pestaña
      
      //estos metatag son estiquetas cargadas en el html que dan descripciones sobre la pagina en la que se encuentra
      const METATAG: MetaDefinition = {
        name: 'description',
        content: this.titulo,
      };

      this.meta.updateTag(METATAG);
    });


  }

  ngOnInit() {
  }

  getDataRoute(){
   return  this.route.events
    .pipe(
      filter(evento => evento instanceof ActivationEnd), //ActivationEnd sale de la propiedades del route
      filter((evento: ActivationEnd) => evento.snapshot.firstChild === null),//filtra de la data que viene la condicion establecida
      map((evento: ActivationEnd) => evento.snapshot.data) //map es como un mapeador de objetos
    )
  }

}
