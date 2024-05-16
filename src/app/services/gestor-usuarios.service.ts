import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, catchError } from 'rxjs';
import { API_URL } from './constantes.service';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
// This service is responsible for managing users
// It has methods to get, add, update and delete users
export class GestorUsuarios {
  private url = `${API_URL}/users`;

  /**
   * Constructor
   * @param http HttpClient
   **/
  constructor(private http: HttpClient) {}

  /**
   * Gets the users
   * @returns An observable of the users
   **/
  getUsuarios(): Observable<Usuario[] | null> {
    return this.http.get<any[]>(this.url).pipe(
      map(response => {
        if (response === null) {
          return null;
        }

        return response.map(usuario => {
          return new Usuario(
            usuario._id,
            usuario.email,
            usuario.password,
            usuario.name,
            usuario.firstlastname,
            usuario.secondlastname,
            usuario.sede,
            usuario.photo,
            usuario.role
          );
        });
      }),
      catchError(_ => {
        return [null];
      })
    );
  }

  /**
   * Gets a user by its ID
   * @param id The ID of the user
   * @returns An observable of the user
   **/
  getUsuario(id: string): Observable<Usuario | null> {
    return this.http.get<any>(`${this.url}/${id}`).pipe(
      map(response => {
        if (response === null) {
          return null;
        }

        return new Usuario(
          response._id,
          response.email,
          response.password,
          response.name,
          response.firstLastname,
          response.secondLastname,
          response.campus,
          response.photo,
          response.rol
        );
      }),
      catchError(_ => {
        return [null];
      })
    );
  }

  /**
   * Adds a user
   * @param usuario The user to add
   * @returns An observable of the user
   **/
  addUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.url, usuario);
  }

  /**
   * Updates a user
   * @param usuario The user to update
   * @returns An observable of the user
   **/
  updateUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(`${this.url}/${usuario.id}`, usuario);
  }

  /**
   * Deletes a user
   * @param id The ID of the user to delete
   * @returns An observable of the user
   **/
  deleteUsuario(id: number): Observable<Usuario> {
    return this.http.delete<Usuario>(`${this.url}/${id}`);
  }
}
