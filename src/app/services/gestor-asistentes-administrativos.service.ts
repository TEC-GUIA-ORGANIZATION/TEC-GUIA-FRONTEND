import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from './constantes.service';
import { AsistenteAdministrativo } from '../models/asistente-administrativo.model';

@Injectable({
  providedIn: 'root'
})
// This class is responsible for managing the asistentes administrativos in the system.
// It uses the API_URL constant to build the URL for the HTTP requests.
export class GestorAsistentesAdministrativos {
  private url = `${API_URL}/asistentes-administrativos`;

  /**
   * Constructor
   * @param HttpClient The HTTP client
   */
  constructor(private http: HttpClient) {}

  /**
   * Gets the asistentes administrativos
   * @returns An observable of the asistentes administrativos
   */
  getAsistentesAdministrativos(): Observable<AsistenteAdministrativo[]> {
    return this.http.get<AsistenteAdministrativo[]>(this.url);
  }

  /**
   * Gets an asistente administrativo by its ID
   * @param id The ID of the asistente administrativo
   * @returns An observable of the asistente administrativo
   */
  getAsistenteAdministrativo(id: number): Observable<AsistenteAdministrativo> {
    return this.http.get<AsistenteAdministrativo>(`${this.url}/${id}`);
  }

  /**
   * Adds an asistente administrativo
   * @param asistenteAdministrativo The asistente administrativo to add
   * @returns An observable of the asistente administrativo
   * */
  addAsistenteAdministrativo(asistenteAdministrativo: AsistenteAdministrativo): Observable<AsistenteAdministrativo> {
    return this.http.post<AsistenteAdministrativo>(this.url, asistenteAdministrativo);
  }

  /**
   * Updates an asistente administrativo
   * @param asistenteAdministrativo The asistente administrativo to update
   * @returns An observable of the asistente administrativo
   */
  updateAsistenteAdministrativo(asistenteAdministrativo: AsistenteAdministrativo): Observable<AsistenteAdministrativo> {
    return this.http.put<AsistenteAdministrativo>(`${this.url}/${asistenteAdministrativo.id}`, asistenteAdministrativo);
  }

  /**
   * Deletes an asistente administrativo
   * @param id The ID of the asistente administrativo to delete
   * @returns An observable of the asistente administrativo
   */
  deleteAsistenteAdministrativo(id: number): Observable<AsistenteAdministrativo> {
    return this.http.delete<AsistenteAdministrativo>(`${this.url}/${id}`);
  }
}
