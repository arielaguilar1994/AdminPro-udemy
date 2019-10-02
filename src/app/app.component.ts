import { Component } from '@angular/core';
import { SettingsService } from './services/service.index';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'adminpro';

  constructor(_ajustes: SettingsService){} 
  //con solo injectarlo ya carga por crea el constructor del servicio
  
}
