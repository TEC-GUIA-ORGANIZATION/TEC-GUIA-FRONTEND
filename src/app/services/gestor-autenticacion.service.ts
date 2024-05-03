import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { catchError, map } from 'rxjs/operators';
import { Usuario } from '../models/usuario.model';
import { API_URL } from './constantes.service';

@Injectable({
  providedIn: 'root'
})
export class GestorAutenticacion {
  private authUrl = `${API_URL}/auth`;

  constructor(private http: HttpClient, private cookieService: CookieService, private router: Router) { }

  login(correo: string, contrasena: string): Observable<boolean> {
    return this.http.post<any>(`${this.authUrl}/login`, { correo, contrasena }).pipe(
      map(response => {
        if (response) {
          // Guardar el token en una cookie (con duración de 1 día)
          this.cookieService.set('token', response.token, 1, '/');
          return true;
        }
        return false;
      }),
      catchError(_ => of(false))
    );
  }

  logout(): Observable<any> {
    // Eliminar la cookie de token
    this.cookieService.delete('token', '/');
    // Redirigir al usuario a la página de login
    this.router.navigate(['/login']);
    return of(true);
  }

  register(usuario: Usuario): Observable<any> {
    return this.http.post<any>(`${this.authUrl}/register`, usuario).pipe(
      catchError(_ => of(false))
    );
  }

  verifyToken(): Observable<any> {
    // Verificar si existe la cookie de token
    const token = this.cookieService.get('token');
    if (!token) {
      return of(false);
    }

    // Realizar una solicitud al backend para verificar el token
    return this.http.post<any>(`${this.authUrl}/verifyToken`, { token }).pipe(
      map(response => {
        if (response) {
          return true;
        }
        return false;
      }),
      catchError(_ => of(false))
    );
  }

  isLoggedIn(): Promise<boolean> {
    // Verificar si existe la cookie de token
    const token = this.cookieService.get('token');
    if (!token) {
      return Promise.resolve(false);
    }

    try {
      const verified = this.verifyToken().toPromise();
      return verified;
    } catch (error) {
      return Promise.resolve(false);
    }
  }
}
