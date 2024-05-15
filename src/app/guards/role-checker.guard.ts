import { Injectable } from "@angular/core";
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable, of } from "rxjs";
import { GestorAutenticacion } from "../services/gestor-autenticacion.service";

@Injectable({
  providedIn: "root"
})
export class RoleChecker implements CanActivate {
  constructor(private authService: GestorAutenticacion, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    var rol = this.authService.getCurrentUserRol();
    let allowedRoles = route.data["allowedRoles"] as Array<string>;

    if (rol === null) {
      alert('Acceso Denegado');
      this.router.navigate(["/"])
      return of(false);
    }

    if (!allowedRoles.includes(rol)) {
      alert('Acceso Denegado');
      this.router.navigate(["/"])
      return of(false);
    }

    return of(true);
  }
}
