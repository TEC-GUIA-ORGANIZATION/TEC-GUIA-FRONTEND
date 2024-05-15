import { Router } from "@angular/router";
import { GestorAutenticacion } from "../services/gestor-autenticacion.service";
import { tap } from 'rxjs/operators';


export function hasRole(allowedRoles: string[], authService: GestorAutenticacion,router: Router) {
  return () =>
    authService.verifyToken().pipe(
      tap((user) => {
        if(!user) {
          router.navigate(["/login"]);
        }
        if (!allowedRoles.includes(user.rol)) {
          alert('Acceso Denegado');
          router.navigate(["/full"]);
        }
      })
    );
}
