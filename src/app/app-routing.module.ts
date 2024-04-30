import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component'; // Assuming LoginComponent is in a file named 'login.component.ts'
import { LoginPasswordForgottenComponent } from './login-password-forgotten/login-password-forgotten.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'login-password-forgotten', component: LoginPasswordForgottenComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full'}
  // Add other routes as needed
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
