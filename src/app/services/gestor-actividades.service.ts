import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from './constantes.service';
import { Actividad } from '../models/actividad.model';

@Injectable({
  providedIn: 'root'
})
// This service is responsible for managing activities
// It has methods to get, add, update and delete activities
export class GestorActividades {
  private url = `${API_URL}/actividades`;

  /**
   * Constructor
   * @param http HttpClient
   */
  constructor(private http: HttpClient) {}

  /**
   * Gets the activities
   * @returns An observable of the activities
   **/
  getActividades(): Observable<Actividad[]> {
    return this.http.get<Actividad[]>(this.url);
  }

  /**
   * Gets an activity by its ID
   * @param id The ID of the activity
   * @returns An observable of the activity
   **/
  getActividad(id: number): Observable<Actividad> {
    return this.http.get<Actividad>(`${this.url}/${id}`);
  }

  /**
   * Adds an activity
   * @param actividad The activity to add
   * @returns An observable of the activity
   **/
  addActividad(actividad: Actividad): Observable<Actividad> {
    return this.http.post<Actividad>(this.url, actividad);
  }

  /**
   * Updates an activity
   * @param actividad The activity to update
   * @returns An observable of the activity
   **/
  updateActividad(actividad: Actividad): Observable<Actividad> {
    return this.http.put<Actividad>(`${this.url}/${actividad.id}`, actividad);
  }

  /**
   * Deletes an activity
   * @param id The ID of the activity to delete
   * @returns An observable of the activity
   **/
  deleteActividad(id: number): Observable<Actividad> {
    return this.http.delete<Actividad>(`${this.url}/${id}`);
  }
}
