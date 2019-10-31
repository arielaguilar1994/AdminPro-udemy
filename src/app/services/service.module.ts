import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { SharedService, 
        SidebarService, 
        SettingsService,
        UsuarioService,
        LoginGuardGuard,
        SubirArchivoService,
        ModalUploadService
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
              SubirArchivoService,
              ModalUploadService
            ]
})
export class ServiceModule { }
