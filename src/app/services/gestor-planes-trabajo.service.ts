import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from './constantes.service';
import { PlanTrabajo } from '../models/plan-trabajo.model';

@Injectable({
  providedIn: 'root'
})
// This service is responsible for managing the work plans.
// It allows you to get the current work plan, add a new work plan, update an existing work plan, and delete a work plan.
export class GestorPlanTrabajo {
  private url = `${API_URL}/planes-trabajo`;

  /**
   * Constructor
   * @param http HttpClient
   **/
  constructor(private http: HttpClient) {}

  /**
   * Gets the current work plan
   * @returns An observable of the current work plan
   **/
  getPlanTrabajoActual(): Observable<PlanTrabajo> {
    return this.http.get<PlanTrabajo>(`${this.url}/actual`);
  }

  /**
   * Gets the work plans
   * @returns An observable of the work plans
   **/
  addPlanTrabajo(planTrabajo: PlanTrabajo): Observable<PlanTrabajo> {
    return this.http.post<PlanTrabajo>(this.url, planTrabajo);
  }

  /**
   * Updates a work plan
   * @param planTrabajo The work plan to update
   * @returns An observable of the work plan
   **/
  updatePlanTrabajo(planTrabajo: PlanTrabajo): Observable<PlanTrabajo> {
    return this.http.put<PlanTrabajo>(`${this.url}/${planTrabajo.id}`, planTrabajo);
  }

  /**
   * Deletes a work plan
   * @param id The ID of the work plan to delete
   * @returns An observable of the work plan
   **/
  deletePlanTrabajo(id: number): Observable<PlanTrabajo> {
    return this.http.delete<PlanTrabajo>(`${this.url}/${id}`);
  }
}
