import { Injectable } from "@angular/core";
import { Router, CanActivate } from "@angular/router";
import { Observable, catchError, map, of } from "rxjs";
import { GestorAutenticacion } from '../services/gestor-autenticacion.service';

@Injectable({
  providedIn: "root"
})
export class AuthGuard implements CanActivate {
  constructor(private authService: GestorAutenticacion, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.authService.verifyToken().pipe(
      map(response => {
        if (response) {
          return true;
        } else {
          this.router.navigate(["/login"]);
          return false;
        }
      }),
      catchError(error => {
        console.error(error);
        return of(false);
      })
    );
  }
}