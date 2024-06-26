import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { API_URL} from './constantes.service';
import { Actividad } from '../models/actividad.model';
import { GestorUsuarios } from './gestor-usuarios.service';
import { Evidencia } from '../models/evidencia.model';

@Injectable({
  providedIn: 'root'
})
// This service is responsible for managing activities
// It has methods to get, add, update and delete activities
export class GestorActividades {
  private url = `${API_URL}/activities`;

  constructor(private http: HttpClient, private gestorUsuarios: GestorUsuarios) {}

  getActividadesTotal(): Observable<Actividad[]> {
    return this.http.get<any[]>(`${this.url}/total`);
  }

  getActividad(id: string): Observable<Actividad | null> {
    return this.http.get<any>(`${this.url}/${id}`).pipe(
      switchMap(response => {
        // Load the responsible professors
        return this.gestorUsuarios.getUsuario(response.responsible).pipe(
          map(usuario => {
            if (usuario === null) {
              console.log('Error getting user');
              return null;
            }

            var evidencia: Evidencia = new Evidencia(response.evidence.attendance, response.evidence.participants, response.evidence.recordingLink);

            // Create the Actividad object once the usuario is retrieved
            return new Actividad(
              response._id,
              response.name,
              response.description,
              response.poster,
              response.date,
              response.week,
              usuario,
              response.type,
              response.status,
              response.daysToAnnounce,
              response.daysToRemember,
              response.modality,
              response.placeLink,
              response.comments,
              evidencia
            );
          })
        );
      }),
      catchError(_ => {
        return of(null);
      })
    );
  }

  createActividad(nombre: string, descripcion: string, poster: string, fecha: Date, semana: number, responsable: any, tipo: string, estado: string, diasPreviosAnunciar: number, diasRequeridosRecordatorio: number, modalidad: string, lugarEnlace: string, campus: string): Observable<any> {
    return this.http.post<any>(this.url, { name: nombre, description: descripcion, poster: poster, date: fecha, week: semana, responsible: responsable, type: tipo, status: estado, daysToAnnounce: diasPreviosAnunciar, daysToRemember: diasRequeridosRecordatorio, modality: modalidad, placeLink: lugarEnlace, evidence: { attendance: [], participants: [], recordingLink: '' }, campus: campus });
  }

  updateActividad(id: string, nombre: string, descripcion: string, poster: string, fecha: Date, semana: number, responsable: any, tipo: string, estado: string, diasPreviosAnunciar: number, diasRequeridosRecordatorio: number, modalidad: string, lugarEnlace: string): Observable<any> {
    return this.http.patch<any>(`${this.url}/${id}`, { name: nombre, description: descripcion, poster: poster, date: fecha, week: semana, responsible: responsable, type: tipo, status: estado, daysToAnnounce: diasPreviosAnunciar, daysToRemember: diasRequeridosRecordatorio, modality: modalidad, placeLink: lugarEnlace });
  }

  updateActividadPoster(id: string, poster: string): Observable<any> {
    return this.http.post<any>(`${this.url}/${id}/poster`, { poster: poster });
  }

  deleteActividad(id: number): Observable<Actividad> {
    return this.http.delete<Actividad>(`${this.url}/${id}`);
  }
}
