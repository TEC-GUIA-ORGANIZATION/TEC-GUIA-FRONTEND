import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from './constantes.service';
import { ProfesorGuia } from '../models/profesor-guia.model';

@Injectable({
  providedIn: 'root'
})
// GestorProfesoresGuia service
// This service is used to manage the profesores guia in the system
export class GestorProfesoresGuia {
  private url = `${API_URL}/profesores-guia`;

  /**
   * Constructor
   * @param http
   */
  constructor(private http: HttpClient) {}

  /**
   * Get all profesores guia
   * @returns Observable<ProfesorGuia[]>
   */
  getProfesoresGuia(): Observable<ProfesorGuia[]> {
    return this.http.get<ProfesorGuia[]>(this.url);
  }

  /**
   * Get profesor guia by id
   * @param id
   * @returns Observable<ProfesorGuia>
   */
  getProfesorGuia(id: number): Observable<ProfesorGuia> {
    return this.http.get<ProfesorGuia>(`${this.url}/${id}`);
  }

  /**
   * Add profesor guia
   * @param profesorGuia
   * @returns Observable<ProfesorGuia>
   */
  addProfesorGuia(profesorGuia: ProfesorGuia): Observable<ProfesorGuia> {
    return this.http.post<ProfesorGuia>(this.url, profesorGuia);
  }

  /**
   * Update profesor guia
   * @param profesorGuia
   * @returns Observable<ProfesorGuia>
   */
  updateProfesorGuia(profesorGuia: ProfesorGuia): Observable<ProfesorGuia> {
    return this.http.put<ProfesorGuia>(`${this.url}/${profesorGuia.id}`, profesorGuia);
  }

  /**
   * Delete profesor guia
   * @param id
   * @returns Observable<ProfesorGuia>
   */
  deleteProfesorGuia(id: number): Observable<ProfesorGuia> {
    return this.http.delete<ProfesorGuia>(`${this.url}/${id}`);
  }
}
