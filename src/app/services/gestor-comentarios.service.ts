import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from './constantes.service';
import { Comentario } from '../models/comentario.model';

@Injectable({
  providedIn: 'root'
})
// This service is responsible for managing comments
// It has methods to get, add, update and delete comments
export class GestorComentarios {
  private url = `${API_URL}/comentarios`;

  /**
   * Constructor
   * @param http HttpClient
   */
  constructor(private http: HttpClient) {}

  /**
   * Gets the comments
   * @returns An observable of the comments
   **/
  getComentarios(): Observable<Comentario[]> {
    return this.http.get<Comentario[]>(this.url);
  }

  /**
   * Gets a comment by its ID
   * @param id The ID of the comment
   * @returns An observable of the comment
   **/
  getComentario(id: number): Observable<Comentario> {
    return this.http.get<Comentario>(`${this.url}/${id}`);
  }

  /**
   * Adds a comment
   * @param comentario The comment to add
   * @returns An observable of the comment
   **/
  addComentario(comentario: Comentario): Observable<Comentario> {
    return this.http.post<Comentario>(this.url, comentario);
  }

  /**
   * Updates a comment
   * @param comentario The comment to update
   * @returns An observable of the comment
   **/
  updateComentario(comentario: Comentario): Observable<Comentario> {
    return this.http.put<Comentario>(`${this.url}/${comentario.id}`, comentario);
  }

  /**
   * Deletes a comment
   * @param id The ID of the comment to delete
   * @returns An observable of the comment
   **/
  deleteComentario(id: number): Observable<Comentario> {
    return this.http.delete<Comentario>(`${this.url}/${id}`);
  }
}
