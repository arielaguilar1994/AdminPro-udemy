import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { SharedService, 
        SidebarService, 
        SettingsService,
        UsuarioService,
        LoginGuardGuard,
        SubirArchivoService
} from './service.index';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [SharedService, 
              SidebarService, 
              SettingsService,
              UsuarioService,
              LoginGuardGuard,
              SubirArchivoService
            ]
})
export class ServiceModule { }
