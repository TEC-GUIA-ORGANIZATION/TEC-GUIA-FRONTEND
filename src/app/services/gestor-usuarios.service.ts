import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from './constantes.service';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
// This service is responsible for managing users
// It has methods to get, add, update and delete users
export class GestorUsuarios {
  private url = `${API_URL}/usuarios`;

  /**
   * Constructor
   * @param http HttpClient
   **/
  constructor(private http: HttpClient) {}

  /**
   * Gets the users
   * @returns An observable of the users
   **/
  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.url);
  }

  /**
   * Gets a user by its ID
   * @param id The ID of the user
   * @returns An observable of the user
   **/
  getUsuario(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.url}/${id}`);
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
