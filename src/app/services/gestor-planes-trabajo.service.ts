import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { API_URL } from './constantes.service';
import { PlanTrabajo } from '../models/plan-trabajo.model';
import { GestorAutenticacion } from './gestor-autenticacion.service';
import { Usuario } from '../models/usuario.model';
@Injectable({
    providedIn: 'root'
})
export class GestorPlanTrabajo {
  private url = `${API_URL}/planning`; // Ajusta la URL base según tus necesidades

  constructor(private http: HttpClient,private authService: GestorAutenticacion) {


  }
  getSemesterFromDate(date: Date): string {
    const month = date.getMonth() + 1;

    if (month >= 1 && month <= 6) {
        return "primer semestre";
    } else if (month >= 7 && month <= 12) {
        return "segundo semestre";
    } else {
        return "semestre no válido";
    }
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
  getCurrentSemester(): string {
    const currentDate = new Date();
    return this.getSemesterFromDate(currentDate);
  }

  getPlannings(): Observable<PlanTrabajo[]> {
      return this.http.get<PlanTrabajo[]>(`${this.url}`);
  }

  getPlanningByCampus(campus: string): Observable<PlanTrabajo[]> {
      return this.http.get<PlanTrabajo[]>(`${this.url}/getByCampus?campus=${campus}`);
  }
}