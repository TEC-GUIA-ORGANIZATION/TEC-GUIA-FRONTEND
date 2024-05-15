import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { API_URL} from './constantes.service';
import { Actividad } from '../models/actividad.model';
import { BlobServiceClient, ContainerClient} from "@azure/storage-blob";

const account = "tecguiastorage";
const sas = "?sv=2022-11-02&ss=bfqt&srt=sco&sp=rwdlacupiytfx&se=2024-06-13T11:00:24Z&st=2024-05-13T03:00:24Z&spr=https&sig=ISrprONOqg7brd%2FRSbs4mOABut12mBLdoCIZpA19E7s%3D";
const blobServiceClient = new BlobServiceClient(`https://${account}.blob.core.windows.net${sas}`);

@Injectable({
  providedIn: 'root'
})
// This service is responsible for managing activities
// It has methods to get, add, update and delete activities
export class GestorActividades {
  private url = `${API_URL}/activities/`;

  constructor(private http: HttpClient) { }

  getActividades(): Observable<Actividad[] | null> {
    return this.http.get<any[]>(this.url).pipe(
      map(response => {
        return response.map(item => {
          return new Actividad(
            item.id,
            item.name,
            item.description,
            item.poster,
            item.date,
            item.week,
            item.responsible,
            item.type,
            item.status,
            item.daysToAnnounce,
            item.daysToRemember,
            item.modality,
            item.placeLink,
            item.comments,
            item.evidence
          );
        });
      }),
      catchError(_ => {
        return [null];
      })
    );
  }

  getActividadesTotal(): Observable<Actividad[]> {
    return this.http.get<any[]>(`${this.url}total`);
  }

  getActividad(id: number): Observable<Actividad | null> {
    return this.http.get<any>(`${this.url}/${id}`).pipe(
      map(response => {
        console.log(response);
        return new Actividad(
          response.id,
          response.name,
          response.description,
          response.poster,
          response.date,
          response.week,
          response.responsible,
          response.type,
          response.status,
          response.daysToAnnounce,
          response.daysToRemember,
          response.modality,
          response.placeLink,
          response.comments,
          response.evidence
        );
      }),
      catchError(_ => {
        return [null];
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

    try{
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

  }
    catch (error) {
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
