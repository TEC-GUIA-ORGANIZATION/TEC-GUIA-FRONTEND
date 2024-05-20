import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { GestorEstudiantes } from '../../services/gestor-estudiantes.service';
import { FormsModule } from '@angular/forms';
import { GestorAutenticacion } from '../../services/gestor-autenticacion.service';
import { Estudiante } from '../../models/estudiante.model';
import { NgxPaginationModule } from 'ngx-pagination';
import { Sede } from '../../models/sede.model';
import { saveAs} from 'file-saver';

@Component({
  standalone: true,
  selector: 'app-estudiantes',
  templateUrl: './estudiantes.component.html',
  styleUrl: './estudiantes.component.css',
  imports: [
    NavbarComponent,
    FormsModule,
    CommonModule,
    NgxPaginationModule
  ],
})
export class EstudiantesComponent implements OnInit {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  estudiantesOriginal: Estudiante[] = [];
  estudiantes: Estudiante[] = []
  estudianteSeleccionado: Estudiante | null = null;
  editMode: boolean = false;
  p: number = 1; // Current page, initialized to 1
  pageSize: number = 5; // Number of items per page
  sedes: string[] = Object.values(Sede); // To store the list of sedes
  searchText: string = ''; // To store the search text
  documentoExcelEnviar: File | null = null;
  selectedOrder: string = 'Carnet'; // To store selected order filter value
  selectedSede: string = ''; // To store selected sede filter value

  constructor(
    private gestorEstudiantes: GestorEstudiantes,
    private gestorAutenticacion: GestorAutenticacion
  ) { }

  ngOnInit(): void {
    this.obtenerEstudiantes();
  }

  obtenerEstudiantes(): void {
    this.gestorEstudiantes.getCurrentFirstSemesterStudents().subscribe(
      (estudiantes: Estudiante[] | null) => {
        if (estudiantes !== null) {
          this.estudiantes = estudiantes;
          this.estudiantesOriginal = estudiantes;
        } else {
          console.error('No se recibieron estudiantes.');
        }
      },
      (error) => {
        console.error('Error al obtener estudiantes:', error);
      }
    );
  }

  editStudent(_t90: Estudiante) {
    throw new Error('Method not implemented.');
  }

  cargarExcel(event: any) {
    this.documentoExcelEnviar = event.target.files[0];

    if (this.documentoExcelEnviar) {
      console.log("Archivo seleccionado:", this.documentoExcelEnviar);
      // Aquí puedes llamar a tu función de servicio y pasar el archivo como parámetro
      this.gestorEstudiantes.cargarArchivoEstudiantes(this.documentoExcelEnviar).subscribe(
        response => {
          console.log("Archivo subido exitosamente.", response);
          if (this.fileInput) {
            this.fileInput.nativeElement.value = '';
            this.documentoExcelEnviar = null;
          }
          // Aquí puedes manejar la respuesta del servidor después de subir el archivo
        },
        error => {
          console.error("Error al subir el archivo:", error);
          if (this.fileInput) {
            this.fileInput.nativeElement.value = '';
            this.documentoExcelEnviar = null;
          }
          // Aquí puedes manejar cualquier error que ocurra durante la subida del archivo
        }
      );
    } else {
      console.warn("No se ha seleccionado ningún archivo.");
    }
  }

  descargarExcel(): void {
    this.gestorEstudiantes.getArchivoEstudiantes().subscribe(
      (archivo: Blob) => {
        // Guardar el archivo descargado utilizando FileSaver.js
        saveAs(archivo, 'students.xlsx');
      },
      error => {
        console.error('Error al descargar el archivo de estudiantes:', error);
        // Manejar el error, por ejemplo, mostrar un mensaje al usuario
      }
    );
  }

  isAdmin(){
    return this.gestorAutenticacion.getCurrentUserRol() === 'admin';
  }

  isProfe(){
    return this.gestorAutenticacion.getCurrentUserRol() === 'profesor guia';
  }

  isCoordinador(){
    return this.gestorAutenticacion.getCurrentUserRol() === 'coordinador';
  }

  isEstudiante(){
    return this.gestorAutenticacion.getCurrentUserRol() === 'estudiante';
  }

  seleccionarEstudiante(estudiante: Estudiante): void {
    this.estudianteSeleccionado = estudiante;
  }

  changeEditMode(mode: boolean): void {
    this.editMode = mode;
  }

  onSearchChange(): void {
    // Filter the students array based on the search text
    this.estudiantes = this.estudiantesOriginal.filter(estudiante => {
      return estudiante.nombre.toLowerCase().includes(this.searchText.toLowerCase()) ||
        estudiante.primerApellido.toLowerCase().includes(this.searchText.toLowerCase()) ||
        estudiante.segundoApellido.toLowerCase().includes(this.searchText.toLowerCase()) ||
        estudiante.correo.toLowerCase().includes(this.searchText.toLowerCase());
    });
  }

  onFilterChange(): void {
    // Filter the students array based on the selected filter
    this.estudiantes = this.estudiantesOriginal.filter(estudiante => {
      if (this.selectedSede !== '' && estudiante.sede !== this.selectedSede) {
        return false;
      }
      return true;
    });
  }

  onSortChange(): void {
    // Sort the students array based on the selected order
    this.estudiantes.sort((a, b) => {
      if (this.selectedOrder === 'Carnet') {
        return a.id > b.id ? 1 : -1;
      } else if (this.selectedOrder === 'Nombre') {
        return a.nombre.localeCompare(b.nombre);
      } else if (this.selectedOrder === 'Primer Apellido') {
        return a.primerApellido.localeCompare(b.primerApellido);
      } else if (this.selectedOrder === 'Segundo Apellido') {
        return a.segundoApellido.localeCompare(b.segundoApellido);
      } else if (this.selectedOrder === 'Correo') {
        return a.correo.localeCompare(b.correo);
      } else if (this.selectedOrder === 'Telefono') {
        return a.telefono.localeCompare(b.telefono);
      }
      return 0;
    });
  }
}

