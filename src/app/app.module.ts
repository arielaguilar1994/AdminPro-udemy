import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

//Routes
import { APP_ROUTES } from './app.routes';

//Modules
import { PagesModule } from './pages/pages.module';
import { SharedModule } from './shared/shared.module';
//Servicios
import { ServiceModule } from './services/service.module';

//Componenete
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';
import { PagesComponent } from './pages/pages.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    PagesComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    //PagesModule, //se esta cargando de forma dinamica en la ruta
    ServiceModule,
    APP_ROUTES,
    ReactiveFormsModule,
    FormsModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
