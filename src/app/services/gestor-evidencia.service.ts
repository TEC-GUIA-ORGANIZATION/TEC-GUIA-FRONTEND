import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from './constantes.service';

@Injectable({
  providedIn: 'root'
})
export class GestorEvidencia {
  private url = `${API_URL}/evidence`;

  constructor(
    private http: HttpClient
  ) { }

  updateRecordingLink(activityId: string, recordingLink: string) {
    return this.http.post(this.url + `/record/${activityId}`, { recordingLink });
  }

  updateAttendance(activityId: string, attendance: string) {
    return this.http.post(this.url + `/attendance/${activityId}`, { attendance });
  }

  updateParticipants(activityId: string, participants: string) {
    return this.http.post(this.url + `/participants/${activityId}`, { participants });
  }

  deleteAttendance(activityId: string, attendance: number) {
    return this.http.delete(this.url + `/attendance/${activityId}/${attendance}`);
  }

  deleteParticipant(activityId: string, participant: number) {
    return this.http.delete(this.url + `/participants/${activityId}/${participant}`);
  }
}
