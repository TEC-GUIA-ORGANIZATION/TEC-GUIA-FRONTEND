import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from './constantes.service';
import { Estudiante } from '../models/estudiante.model';

@Injectable({
  providedIn: 'root'
})
// This service is responsible for managing students
// It has methods to get, add, update and delete students
export class GestorEstudiantes {
  private url = `${API_URL}/estudiantes`;

  /**
   * Constructor
   * @param http HttpClient
   */
  constructor(private http: HttpClient) {}

  /**
   * Gets the students
   * @returns An observable of the students
   **/
  getEstudiantes(): Observable<Estudiante[]> {
    return this.http.get<Estudiante[]>(this.url);
  }

  /**
   * Gets a student by its ID
   * @param id The ID of the student
   * @returns An observable of the student
   **/
  getEstudiante(id: number): Observable<Estudiante> {
    return this.http.get<Estudiante>(`${this.url}/${id}`);
  }

  /**
   * Adds a student
   * @param estudiante The student to add
   * @returns An observable of the student
   **/
  addEstudiante(estudiante: Estudiante): Observable<Estudiante> {
    return this.http.post<Estudiante>(this.url, estudiante);
  }

  /**
   * Updates a student
   * @param estudiante The student to update
   * @returns An observable of the student
   **/
  updateEstudiante(estudiante: Estudiante): Observable<Estudiante> {
    return this.http.put<Estudiante>(`${this.url}/${estudiante.id}`, estudiante);
  }

  /**
   * Deletes a student
   * @param id The ID of the student to delete
   * @returns An observable of the student
   **/
  deleteEstudiante(id: number): Observable<Estudiante> {
    return this.http.delete<Estudiante>(`${this.url}/${id}`);
  }

  // TODO: Implement
  getArchivoEstudiantes() {}

  // TODO: Implement
  cargarArchivoEstudiantes(file: File) {}
}
