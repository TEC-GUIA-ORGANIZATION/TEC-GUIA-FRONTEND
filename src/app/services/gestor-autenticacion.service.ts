import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { catchError, map } from 'rxjs/operators';
import { Usuario } from '../models/usuario.model';
import { API_URL } from './constantes.service';
import { GestorEstudiantes } from './gestor-estudiantes.service';

@Injectable({
  providedIn: 'root'
})
export class GestorAutenticacion {
  private authUrl = `${API_URL}/auth`;
  private currentUser: Usuario | null = null;

  constructor(private http: HttpClient, 
    @Inject(CookieService) private cookieService: CookieService, 
    private router: Router) { }

  login(correo: string, contrasena: string): Observable<boolean> {
    return this.http.post<any>(`${this.authUrl}/signin`, { "email": correo, "password": contrasena }, { observe: 'response' }).pipe(
      map(response => {
        if (response) {
          const authToken = response.headers.get('auth-token');
          if (authToken !== null) {
            // Guardar el token en una cookie (con duración de 1 día)
            this.cookieService.set('token', authToken, 1, '/');

            // Guardar el usuario actual
            var r = response.body;
            this.currentUser = new Usuario(r._id, r.email, r.password, r.name, r.firstLastname, r.secondLastname, r.campus, r.photo, r.rol);

            return true;
          } else {
            // Auth token not found in headers
            console.error('Auth token not found in response headers');
            return false;
          }
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
  changePassword(email:string|undefined,newPassword:string): Observable<any> {
    const password = this.currentUser?.contrasena;
    console.log(email,password,newPassword)
    return this.http.patch<any>(`${this.authUrl}/updatePassword`, {email,password,newPassword}).pipe(
      catchError(_ => of(false))
    );
  }

  verifyToken(): Observable<any> {
    // Verificar si existe la cookie de token
    const token = this.cookieService.get('token');
    if (!token) {
      return of(false);
    }

    // Crear el encabezado con el token
    const headers = new HttpHeaders({
      'auth-token': token
    });

    // Realizar una solicitud al backend para verificar el token con el token en el encabezado
    return this.http.get<any>(`${this.authUrl}/profile`, { headers }).pipe(
      map(response => {
        if (response) {
          // Guardar el usuario actual
          var r = response
          this.currentUser = new Usuario(r._id, r.email, r.password, r.name, r.firstLastname, r.secondLastname, r.campus, r.photo, r.rol);

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

    return this.verifyToken().toPromise()
      .then(verified => {
        return verified;
      })
      .catch(_ => {
        return false;
      });
  }

  getCurrentUser(): Usuario | null {
    return this.currentUser;
  }

  getCurrentUserRol(): string | null {
    return this.currentUser?.rol || null;
  }
}
