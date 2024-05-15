import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component'; // Assuming LoginComponent is in a file named 'login.component.ts'
import { RecoverPasswordComponent } from './components/recover-password/recover-password.component'; // Assuming RecoverPasswordComponent is in a file named 'recover-password.component.ts'
import { HomeComponent } from './components/home/home.component';
import { ActividadesComponent } from './components/actividades/actividades.component';
import { EquipoComponent } from './components/equipo/equipo.component';
import { EstudiantesComponent } from './components/estudiantes/estudiantes.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AuthGuard } from './guards/auth.guard';
import { CrearActividadComponent } from './components/crear-actividad/crear-actividad.component';
import { ActividadComponent } from './components/actividad/actividad.component';
import { RoleChecker } from './guards/role-checker.guard';
// import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'recover-password', component: RecoverPasswordComponent },
  // { path: 'register', component: RegisterComponent },
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'equipo', component: EquipoComponent, canActivate: [AuthGuard, RoleChecker], data: { allowedRoles: ['admin', 'profesor guia'] } },
  { path: 'estudiantes', component: EstudiantesComponent, canActivate: [AuthGuard, RoleChecker], data: { allowedRoles: ['admin', 'profesor guia'] } },
  { path: 'actividades', component: ActividadesComponent, canActivate: [AuthGuard] },
  { path: 'crear-actividad', component: CrearActividadComponent, canActivate: [AuthGuard, RoleChecker], data: { allowedRoles: ['profesor guia'] } },
  { path: 'actividad/:id', component: ActividadComponent, canActivate: [AuthGuard] },

  // Wildcard route
  { path: '**', pathMatch: 'full', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
