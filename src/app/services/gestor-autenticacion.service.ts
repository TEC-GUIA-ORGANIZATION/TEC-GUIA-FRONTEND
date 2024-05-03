import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Usuario } from '../models/usuario.model';
import { API_URL } from './constantes.service';

@Injectable({
  providedIn: 'root'
})
export class GestorAutenticacion {
  private authUrl = `${API_URL}/auth`;

  constructor(private http: HttpClient) {}

  login(correo: string, contrasena: string): Observable<any> {
    return this.http.post<any>(`${this.authUrl}/login`, { correo, contrasena }).pipe(
      map(response => {
        if (response && response.token) {
          // Almacenar el token en una cookie
          document.cookie = `token=${response.token}; Secure; SameSite=None`;
          console.log('Token almacenado en cookie');
          return true;
        }
        console.log('No se recibió un token');
        return false;
      }),
      catchError(error => of(false))
    );
  }

  logout(): Observable<any> {
    return this.http.post<any>(`${this.authUrl}/logout`, {}).pipe(
      map(() => {
        // Eliminar la cookie de token
        document.cookie = 'token=; Secure; SameSite=None; expires=Thu, 01 Jan 1970 00:00:00 GMT';
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
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, "$1");
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
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, "$1");
    return !!token;
  }
}

