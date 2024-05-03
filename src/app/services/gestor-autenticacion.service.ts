import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { catchError, map } from 'rxjs/operators';
import { Usuario } from '../models/usuario.model';
import { API_URL } from './constantes.service';

@Injectable({
  providedIn: 'root'
})
export class GestorAutenticacion {
  private authUrl = `${API_URL}/auth`;

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  login(correo: string, contrasena: string): Observable<boolean> {
    return this.http.post<any>(`${this.authUrl}/login`, { correo, contrasena }).pipe(
      map(response => {
        if (response) {
          // Almacenar el token en una cookie
          this.cookieService.set('token', response.token, 7, '/', '', true, 'None');
          return true;
        }
        return false;
      }),
      catchError(error => of(false))
    );
  }

  logout(): Observable<any> {
    return this.http.post<any>(`${this.authUrl}/logout`, {}).pipe(
      map(() => {
        // Eliminar la cookie de token
        this.cookieService.delete('token', '/');
        return true;
      }),
      catchError(error => of(false))
    );
  }

  register(usuario: Usuario): Observable<any> {
    return this.http.post<any>(`${this.authUrl}/register`, usuario).pipe(
      catchError(error => of(false))
    );
  }

  verifyToken(): Observable<any> {
    // Verificar si existe la cookie de token
    const token = this.cookieService.get('token');
    if (!token) {
      return of(false);
    }

    // Realizar una solicitud al backend para verificar el token
    return this.http.get<any>(`${this.authUrl}/verifyToken`).pipe(
      catchError(error => of(false))
    );
  }

  isLoggedIn(): boolean {
    // Verificar si existe la cookie de token
    const token = this.cookieService.get('token');
    return !!token;
  }
}

