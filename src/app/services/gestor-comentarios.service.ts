import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from './constantes.service';
import { Comentario } from '../models/comentario.model';
import { map, catchError } from 'rxjs/operators';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
// This service is responsible for managing comments
// It has methods to get, add, update and delete comments
export class GestorComentarios {
  private url = `${API_URL}/comments`;

  /**
   * Constructor
   * @param http HttpClient
   */
  constructor(private http: HttpClient) {}

  /**
   * Gets the comments
   * @returns An observable of the comments
   **/
  getComentarios(): Observable<Comentario[] | null> {
    return this.http.get<any[]>(this.url).pipe(
      map(response => {
        return response.map(item => {
          return new Comentario(
            item.timestamp,
            item.professor,
            item.message
          );
        });
      }),
      catchError(_ => {
        return [null];
      })
    );
  }

  getComentariosActividad(id: string): Observable<Comentario[] | null> {
    return this.http.get<any>(`${this.url}/${id}`).pipe(
      map(response => {
        return response.map((item: any) => {
          return new Comentario(
            item.timestamp,
            item.professor,
            item.message
          );
        });
      }),
      catchError(_ => {
        return [null];
      })
    );
  }

  /**
   * Adds a comment
   * @param comentario The comment to add
   * @returns An observable of the comment
   **/
  addComentario(activityId: string, comentario: Comentario, user: Usuario): Observable<Comentario> {
    const data = {
      fechaHora: comentario.fechaHora,
      contenido: comentario.contenido,
      autor: {
        nombre: user.nombre,
        primerApellido: user.primerApellido,
        segundoApellido: user.segundoApellido
      }
    };
    return this.http.post<Comentario>(`${this.url}/${activityId}`, data);
  }

  /**
   * Updates a comment
   * @param comentario The comment to update
   * @returns An observable of the comment
   **/
  updateComentario(comentario: Comentario): Observable<Comentario> {
    return this.http.put<Comentario>(`${this.url}/${comentario}`, comentario);
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
