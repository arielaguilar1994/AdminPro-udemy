import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { SharedService, 
        SidebarService, 
        SettingsService,
        UsuarioService,
        LoginGuardGuard,
        AdminGuard,
        SubirArchivoService,
        ModalUploadService,
        HospitalService,
        MedicoService
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
              AdminGuard,
              SubirArchivoService,
              ModalUploadService,
              HospitalService,
              MedicoService
            ]
})
export class ServiceModule { }
