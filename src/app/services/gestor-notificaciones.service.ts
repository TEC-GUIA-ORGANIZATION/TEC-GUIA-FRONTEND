import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GestorAutenticacion } from './gestor-autenticacion.service';
import { Observable, map } from 'rxjs';
import { Notificacion } from '../models/notificacion.model';
import { API_URL } from './constantes.service';

@Injectable({
  providedIn: 'root'
})
export class GestorNotificaciones {
  constructor(
    private http: HttpClient,
    private gestorAutenticacion: GestorAutenticacion
  ) { }

  /**
    * Obtiene las notificaciones de un usuario
  * @param userId El id del usuario
  * @returns Un arreglo con las notificaciones del usuario
  **/
  obtenerNotificacionesUsuario(): Observable<Notificacion[]> {
    return this.http.get(`${API_URL}/notifications/${this.gestorAutenticacion.getCurrentUser()!.id}`).pipe(
      map((response: any) => {
        return response.map((item: any) => {
          return new Notificacion(
            item._id,
            item.mensaje.contenido,
            new Date(item.mensaje.fecha),
            item.mensaje.emisor,
            item.leido
          );
        });
      })
    );
  }

  /**
    * Toggle the read status of a notification
  * @param notificationId The id of the notification
  * @returns void
  **/
  toggleReadStatus(notificationId: string): Observable<any> {
    return this.http.put(`${API_URL}/notifications/${notificationId}`, {});
  }

  /**
    * Get the number of unread notifications
  * @returns The number of unread notifications
  * */
  obtenerNumeroNotificacionesNoLeidas(): Observable<number> {
    return this.http.get(`${API_URL}/notifications/${this.gestorAutenticacion.getCurrentUser()!.id}`).pipe(
      map((response: any) => {
        return response.filter((item: any) => !item.leido).length;
      })
    );
  }

  /**
   * Elimina una notificación
  * @param notificationId El id de la notificación
  * @returns void
  * */
  eliminarNotificacion(notificationId: string): Observable<any> {
    return this.http.delete(`${API_URL}/notifications/${notificationId}`);
  }
}
