import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL_LOCAL } from './constantes.service';
import { Estudiante } from '../models/estudiante.model';

@Injectable({
  providedIn: 'root'
})
export class GestorEstudiantes {
  private url = `${API_URL_LOCAL}/studentList`;

  constructor(private http: HttpClient) {}

  getEstudiantes(params: { semester: string, entryYear: number }): Observable<any[]> {
    return this.http.post<any[]>(`${this.url}/getAllStudentsInPeriod`, params);
  }

  getEstudiante(id: string): Observable<Estudiante> {
    return this.http.get<Estudiante>(`${this.url}/${id}`);
  }

  addEstudiante(estudiante: Estudiante): Observable<Estudiante> {
    return this.http.post<Estudiante>(this.url, estudiante);
  }

  updateEstudiante(estudiante: Estudiante): Observable<Estudiante> {
    return this.http.put<Estudiante>(`${this.url}/${estudiante.id}`, estudiante);
  }

  deleteEstudiante(id: string): Observable<Estudiante> {
    return this.http.delete<Estudiante>(`${this.url}/${id}`);
  }

  getArchivoEstudiantes() {
    // Implementar si es necesario
  }

  cargarArchivoEstudiantes(file: File) {
    // Implementar si es necesario
  }
}
