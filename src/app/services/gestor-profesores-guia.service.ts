import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { API_URL } from './constantes.service';
import { ProfesorGuia } from '../models/profesor-guia.model';
import { Sede } from '../models/sede.model';

@Injectable({
  providedIn: 'root'
})
// GestorProfesoresGuia service
// This service is used to manage the profesores guia in the system
export class GestorProfesoresGuia {
  private url = `${API_URL}/generalProfessors`;
  private url2 = `${API_URL}/guideProfessors`;

  /**
   * Constructor
   * @param http
   */
  constructor(private http: HttpClient) {}

  /**
   * Get all profesores guia
   * @returns Observable<ProfesorGuia[]>
   */
  getProfesoresGuia(): Observable<ProfesorGuia[]> {
    return this.http.get<any>(`${this.url}/getAllProfessors`).pipe(
      map(response => {
        return response.data.map((profesor: any) => {
          return new ProfesorGuia(
            profesor._id,
            profesor.email,
            profesor.password,
            profesor.name,
            profesor.firstLastname,
            profesor.secondLastname,
            profesor.campus,
            profesor.photo,
            profesor.rol,
            profesor.code,
            profesor.officePhone,
            profesor.personalPhone,
            profesor.isCoordinator,
            profesor.isActive
          );
        });
      })
    );
  }
  updateProfesor(profesor: ProfesorGuia): Observable<any> {
    const url = `${this.url}/updateProfessor/${profesor.id}`;
    const body = {
      email: profesor.correo,
      name: profesor.nombre,
      firstLastname: profesor.primerApellido,
      secondLastname: profesor.segundoApellido,
      campus: profesor.sede, // Ejemplo de cómo obtener la sede del estudiante
      photo: profesor.fotografia,
      rol: profesor.rol,
      code: profesor.codigo,
      userType: 'ProfesorGuia',
      officePhone: profesor.telefonoOficina,
      personalPhone: profesor.telefonoPersonal,
      isCoordinator:profesor.esCoordinador,
      isActive:profesor.estaActivo
    };

    return this.http.patch(url, body);
  }
  changeState(professorId: string): Observable<any> {
    return this.http.patch(`${this.url2}/changeStatus`, { professorId });
  }
  setCoordinador(newCoordinatorId: string,campus:Sede): Observable<any>{
    return this.http.patch(`${this.url2}/setCoordinator`, { campus, newCoordinatorId })
  }
  createProfessor(professorData: ProfesorGuia): Observable<any> { // Usa ProfesorGuia como tipo de datos
    const body= {
      "email":professorData.correo,
      "password":professorData.contrasena,
      "name":professorData.nombre,
      "firstLastname": professorData.primerApellido,
      "secondLastname":professorData.segundoApellido,
      "campus":professorData.sede,
      "photo":professorData.fotografia,
      "rol":professorData.rol,
      "userType":"ProfesorGuia",
      "officePhone":professorData.telefonoOficina,
      "personalPhone":professorData.telefonoPersonal,
      "isCoordinator":false,
      "isActive":true
  }
    return this.http.post(`${this.url}/createProfessor`, body);
  }

  /**
   * Get profesor guia by id
   * @param id
   * @returns Observable<ProfesorGuia>
   */
  getProfesorGuia(id: number): Observable<ProfesorGuia> {
    return this.http.get<ProfesorGuia>(`${this.url}/${id}`);
  }

  /**
   * Add profesor guia
   * @param profesorGuia
   * @returns Observable<ProfesorGuia>
   */
  addProfesorGuia(profesorGuia: ProfesorGuia): Observable<ProfesorGuia> {
    return this.http.post<ProfesorGuia>(this.url, profesorGuia);
  }

  /**
   * Update profesor guia
   * @param profesorGuia
   * @returns Observable<ProfesorGuia>
   */
  updateProfesorGuia(profesorGuia: ProfesorGuia): Observable<ProfesorGuia> {
    return this.http.put<ProfesorGuia>(`${this.url}/${profesorGuia.id}`, profesorGuia);
  }

  /**
   * Delete profesor guia
   * @param id
   * @returns Observable<ProfesorGuia>
   */
  deleteProfesorGuia(id: number): Observable<ProfesorGuia> {
    return this.http.delete<ProfesorGuia>(`${this.url}/${id}`);
  }
}
