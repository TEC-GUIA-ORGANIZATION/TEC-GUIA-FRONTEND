import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, zip } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { API_URL} from './constantes.service';
import { Actividad } from '../models/actividad.model';
import { BlobServiceClient } from "@azure/storage-blob";
import { GestorUsuarios } from './gestor-usuarios.service';
import { Evidencia } from '../models/evidencia.model';

const account = "tecguiastorage";
const sas = "?sv=2022-11-02&ss=bfqt&srt=sco&sp=rwdlacupiytfx&se=2024-06-13T11:00:24Z&st=2024-05-13T03:00:24Z&spr=https&sig=ISrprONOqg7brd%2FRSbs4mOABut12mBLdoCIZpA19E7s%3D";
const blobServiceClient = new BlobServiceClient(`https://${account}.blob.core.windows.net${sas}`);

  @Injectable({
  providedIn: 'root'
})
// This service is responsible for managing activities
// It has methods to get, add, update and delete activities
export class GestorActividades {
  private url = `${API_URL}/activities`;

  constructor(private http: HttpClient, private gestorUsuarios: GestorUsuarios) {}

  getActividades(): Observable<Actividad[] | null> {
    return this.http.get<any[]>(this.url).pipe(
      switchMap(response => {
        // Create an array of observables for each getUsuario call
        const observables: Observable<Actividad | null>[] = response.map(item => {
          return this.gestorUsuarios.getUsuario(item.responsible).pipe(
            catchError(_ => of(null)),
              map(responsable => {
              if (responsable === null) {
                console.log('Error getting user');
                return null;
              }

              var evidencia: Evidencia = new Evidencia(item.evidence.attendance, item.evidence.participants, item.evidence.recordingLink);

              // Create and return Actividad object
              return new Actividad(
                item._id,
                item.name,
                item.description,
                item.poster,
                item.date,
                item.week,
                responsable,
                item.type,
                item.status,
                item.daysToAnnounce,
                item.daysToRemember,
                item.modality,
                item.placeLink,
                item.comments,
                evidencia
              );
            })
          );
        });

        // Combine the results of all observables into one observable emitting arrays
        return zip(...observables).pipe(
          map(actividades => actividades.filter(actividad => actividad !== null) as Actividad[])
        );
      }),
      catchError(_ => {
        return of(null);
      })
    );
  }

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

  createActividad(nombre: string, descripcion: string, poster: File | null, fecha: Date, semana: number, responsable: string, tipo: string, estado: string, diasPreviosAnunciar: number, diasRequeridosRecordatorio: number, modalidad: string, lugarEnlace: string): Observable<Actividad> {
    return this.http.post<Actividad>(this.url, { name: nombre, description: descripcion, poster: poster, date: fecha, week: semana, responsible: responsable, type: tipo, status: estado, daysToAnnounce: diasPreviosAnunciar, daysToRemember: diasRequeridosRecordatorio, modality: modalidad, placeLink: lugarEnlace });
  }

  updateActividad(actividad: Actividad): Observable<Actividad> {
    return this.http.put<Actividad>(`${this.url}/${actividad.id}`, actividad);
  }

  deleteActividad(id: number): Observable<Actividad> {
    return this.http.delete<Actividad>(`${this.url}/${id}`);
  }
}
