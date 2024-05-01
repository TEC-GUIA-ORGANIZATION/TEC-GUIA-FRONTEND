import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material/material.module';
import { FlexLayoutServerModule } from '@angular/flex-layout/server';
import { LoginPasswordForgottenComponent } from './login-password-forgotten/login-password-forgotten.component';
import { HomeComponent } from './home/home.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SeccionEstudiantesComponent } from './seccion-estudiantes/seccion-estudiantes.component';
import { SeccionActividadesComponent } from './seccion-actividades/seccion-actividades.component';
import { SeccionEquipoComponent } from './seccion-equipo/seccion-equipo.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LoginPasswordForgottenComponent,
    HomeComponent,
    SeccionEstudiantesComponent,
    SeccionActividadesComponent,
    SeccionEquipoComponent
  ],
  imports: [
    FontAwesomeModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutServerModule
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
