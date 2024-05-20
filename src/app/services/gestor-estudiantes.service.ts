import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from './constantes.service';
import { Estudiante } from '../models/estudiante.model';
import { GestorAutenticacion } from './gestor-autenticacion.service';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GestorEstudiantes {
  private url = `${API_URL}/studentList`;

  constructor(private http: HttpClient, private authService:GestorAutenticacion) { }

  getCurrentFirstSemesterStudents(): Observable<Estudiante[] | null> {
    return this.http.get<any[]>(`${this.url}/currentFirstSemesterStudents`).pipe(
      map(response => {
        // Map each item in the response array to an Estudiante object
        return response.map(item => {
          // Assuming the properties of the item map directly to Estudiante properties
          return new Estudiante(
            item._id,
            item.email,
            item.name,
            item.firstLastname,
            item.secondLastname,
            item.personalPhone,
            item.campus,
            item.institutionId,
            item.personalPhone,
            item.semester,
            item.entryYear,
            item.photo
          );
        });
      }),
      catchError(_ => {
        return of(null);
      })
    );
  }

  getEstudiantes(semester: string, entryYear: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}/getAllStudents`, { params: { semester, entryYear } });
  }

  getEstudiante(id: string): Observable<Estudiante> {
    return this.http.get<Estudiante>(`${this.url}/${id}`);
  }

  getEstudiantesPorSede(semester: string, entryYear: number, campus: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}/getAllStudentsByCampus`, { params: { semester, entryYear, campus } });
  }

  editarEstudiante(id: string, estudiante: Estudiante): Observable<Estudiante> {
    return this.http.put<Estudiante>(`${this.url}/${id}`, estudiante);
  }

  deleteEstudiante(id: string): Observable<Estudiante> {
    return this.http.delete<Estudiante>(`${this.url}/${id}`);
  }

  getArchivoEstudiantes(): Observable<Blob> {
    // Obtener el campus como una cadena
    const campus = this.authService.getCurrentUser()?.sede?.toString();

    // Realizar la solicitud GET para descargar el archivo Excel
    return this.http.get(`${this.url}/download/${campus}`, { responseType: 'blob' });
  }

  cargarArchivoEstudiantes(fileExcel: File) {
    const formData = new FormData();
    formData.append('file', fileExcel);

    // Obtener el campus como una cadena
    const campus = this.authService.getCurrentUser()?.sede?.toString();

    // Verificar si campus no es nulo o indefinido antes de agregarlo al FormData
    if (campus) {
      formData.append('campus', campus);
    }
    console.log(formData)

    // Enviar la solicitud POST al backend
    return this.http.post(`${this.url}/upload`, formData, { responseType: 'text' }); // especificar responseType como 'text'
  }
}
