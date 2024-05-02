import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { GestorAutenticacion } from '../services/gestor-autenticacion.service';

@Injectable({
  providedIn: "root"
})
export class AuthGuard {
  constructor(private authService: GestorAutenticacion, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isLoggedIn()) {
      return true;
    }
    this.router.navigate(["/login"]);
    return false;
  }
}
