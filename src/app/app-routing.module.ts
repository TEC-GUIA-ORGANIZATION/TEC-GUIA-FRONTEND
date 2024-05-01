import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './View/login/login.component'; // Assuming LoginComponent is in a file named 'login.component.ts'
import { LoginPasswordForgottenComponent } from './View/login-password-forgotten/login-password-forgotten.component';
import { HomeComponent } from './View/home/home.component';
import { SeccionActividadesComponent } from './View/seccion-actividades/seccion-actividades.component';
import { SeccionEquipoComponent } from './View/seccion-equipo/seccion-equipo.component';
import { SeccionEstudiantesComponent } from './View/seccion-estudiantes/seccion-estudiantes.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'login-password-forgotten', component: LoginPasswordForgottenComponent },
  { 
    path: '', component: HomeComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' }, // Default child route
      { path: 'home', component: HomeComponent },
      { path: 'actividades', component: SeccionActividadesComponent },
      { path: 'equipo', component: SeccionEquipoComponent },
      { path: 'estudiantes', component: SeccionEstudiantesComponent }
    ]
  },
  // Add other routes as needed
];

//  { path: '', redirectTo: '/login', pathMatch: 'full'},

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
