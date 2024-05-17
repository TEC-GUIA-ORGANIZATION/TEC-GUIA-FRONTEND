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

  async addActividad(
    week: number,
    activity: string,
    activityName: string,
    responsible: string[],
    daysToAnnounce: number,
    daysToRemember: number,
    isInPerson: boolean,
    meetingLink: string,
    poster: File|null,
    activityStatus: string,
    attendancePhoto: File|null,
    participantsPhoto: File|null,
    recording: string|null,
  ): Promise<Actividad> {

    var posterUrl:string="";
    const evidence = {
      attendancePhoto: "",
      participantsPhoto: "",
      recordingLink: recording
    };

    const containerClientAttendance = blobServiceClient.getContainerClient('fotos-actividades-attendance');
    const containerClientParticipants = blobServiceClient.getContainerClient('fotos-actividades-participants');
    const containerClientPoster = blobServiceClient.getContainerClient('fotos-actividades-poster');

    try {
      if (poster) {
        const posterBlobName = `${new Date().getTime()}-poster-${poster.name}`;
        const posterBlobClient = containerClientPoster.getBlockBlobClient(posterBlobName);
        await posterBlobClient.uploadData(poster);
        posterUrl = posterBlobClient.url;
      }

      if (attendancePhoto) {
        const attendanceBlobName = `${new Date().getTime()}-attendance-${attendancePhoto.name}`;
        const attendanceBlobClient = containerClientAttendance.getBlockBlobClient(attendanceBlobName);
        await attendanceBlobClient.uploadData(attendancePhoto);
        evidence.attendancePhoto = attendanceBlobClient.url;
      }

      if (participantsPhoto) {
        const participantsBlobName = `${new Date().getTime()}-participants-${participantsPhoto.name}`;
        const participantsBlobClient = containerClientParticipants.getBlockBlobClient(participantsBlobName);
        await participantsBlobClient.uploadData(participantsPhoto);
        evidence.participantsPhoto = participantsBlobClient.url;
      }
    } catch (error) {
      console.error('Error al subir archivos:', error);
      throw error;
    }

    // hazlo para todos los campos
    const body = {
      week,
      activity,
      activityName,
      responsible,
      daysToAnnounce,
      daysToRemember,
      isInPerson,
      meetingLink,
      posterUrl,
      activityStatus,
      evidence, // Agregar el campo evidence
    };

    try {
      const response = await this.http.post<Actividad>(this.url, body).toPromise();
      return response || {} as Actividad;
    } catch (error) {
      console.error('Error al agregar actividad:', error);
      throw error;
    }
  }

  updateActividad(actividad: Actividad): Observable<Actividad> {
    return this.http.put<Actividad>(`${this.url}/${actividad.id}`, actividad);
  }

  deleteActividad(id: number): Observable<Actividad> {
    return this.http.delete<Actividad>(`${this.url}/${id}`);
  }
}
