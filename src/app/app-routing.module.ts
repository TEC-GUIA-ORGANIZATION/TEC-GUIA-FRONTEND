import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component'; // Assuming LoginComponent is in a file named 'login.component.ts'
import { RecoverPasswordComponent } from './components/recover-password/recover-password.component'; // Assuming RecoverPasswordComponent is in a file named 'recover-password.component.ts'
import { HomeComponent } from './components/home/home.component';
import { ActividadesComponent } from './components/actividades/actividades.component';
import { EquipoComponent } from './components/equipo/equipo.component';
import { EstudiantesComponent } from './components/estudiantes/estudiantes.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'recover-password', component: RecoverPasswordComponent },
  { path: '', component: HomeComponent },
  { path: 'actividades', component: ActividadesComponent },
  { path: 'equipo', component: EquipoComponent },
  { path: 'estudiantes', component: EstudiantesComponent }
  // Add other routes as needed
];

//  { path: '', redirectTo: '/login', pathMatch: 'full'},

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
