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
  private url = `${API_URL}/students`;

  constructor(private http: HttpClient, private authService:GestorAutenticacion) { }

  getCurrentFirstSemesterStudents(): Observable<Estudiante[] | null> {
    return this.http.get<any[]>(`${this.url}/current-semester`).pipe(
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
            item.institutionID,
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

  getEstudiante(id: string): Observable<Estudiante | null> {
    return this.http.get<any>(`${this.url}/wrapped/${id}`).pipe(
      map(response => {
        return new Estudiante(
          response._id,
          response.email,
          response.name,
          response.firstLastname,
          response.secondLastname,
          response.personalPhone,
          response.campus,
          response.institutionID,
          response.personalPhone,
          response.semester,
          response.entryYear,
          response.photo
        );
      }),
      catchError(_ => {
        return of(null);
      })
    );
  }

  getEstudiantesPorSede(campus: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}/getAllStudentsByCampus`, { params: { campus } });
  }

  updateStudent(student: Estudiante): Observable<any> {
    const url = `${this.url}/updateStudent/${student.id}`;
    const body = {
      email: student.correo,
      name: student.nombre,
      firstLastname: student.primerApellido,
      secondLastname: student.segundoApellido,
      campus: student.sede, // Ejemplo de cómo obtener la sede del estudiante
      photo: student.foto,
      rol: 'estudiante',
      userType: 'Students',
      institutionId: student.institutionId,
      personalPhone: student.personalPhone,
      semester: student.semester,
      entryYear: student.entryYear,
    };

    return this.http.patch(url, body);
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
  getArchivoEstudiantesTotal(): Observable<Blob> {

    // Realizar la solicitud GET para descargar el archivo Excel
    return this.http.get(`${this.url}/downloadAll`, { responseType: 'blob' });
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
