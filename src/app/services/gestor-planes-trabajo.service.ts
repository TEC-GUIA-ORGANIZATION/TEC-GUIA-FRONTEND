import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of, switchMap, zip } from 'rxjs';
import { API_URL } from './constantes.service';
import { PlanTrabajo } from '../models/plan-trabajo.model';
import { GestorAutenticacion } from './gestor-autenticacion.service';
import { Usuario } from '../models/usuario.model';
import { Actividad } from '../models/actividad.model';
import { Evidencia } from '../models/evidencia.model';
import { GestorUsuarios } from './gestor-usuarios.service';
@Injectable({
    providedIn: 'root'
})
export class GestorPlanTrabajo {
  private url = `${API_URL}/planning`; // Ajusta la URL base según tus necesidades

  constructor(
    private http: HttpClient,
    private authService: GestorAutenticacion,
    private gestorUsuarios: GestorUsuarios
  ) { }

  getActividades(): Observable<Actividad[] | null> {
    return this.http.get<any[]>(`${this.url}/getActivitiesOfPlanning?semester=${this.getCurrentSemester()}&year=${new Date().getFullYear()}`).pipe(
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

  createPlanning(): Observable<PlanTrabajo | undefined> {
    const semester = this.getCurrentSemester();
    const user = this.authService.getCurrentUser();

    if (user && user instanceof Usuario && user.sede) {
      const campus = user.sede;
      const body = { semester, campus };
      return this.http.post<PlanTrabajo>(`${this.url}`, body).pipe(
        catchError(() => of(undefined)) // Manejar errores y devolver undefined
      );
    } else {
      return of(undefined); // Si el usuario no está autenticado o no tiene una sede, devuelve undefined
    }
  }

  getSemesterFromDate(date: Date): string {
    const month = date.getMonth() + 1;
    return month >= 1 && month <= 6 ? "primer semestre" :  "segundo semestre";
  }

  getCurrentSemester(): string {
    const currentDate = new Date();
    return this.getSemesterFromDate(currentDate);
  }

  getPlannings(): Observable<PlanTrabajo[]> {
      return this.http.get<PlanTrabajo[]>(`${this.url}`);
  }
}
