import { Component, ElementRef, ViewChild } from '@angular/core';
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
export class EstudiantesComponent {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  estudiantes: Estudiante[] = []
  estudianteSeleccionado: Estudiante | null = null;
  editMode: boolean = false;
  p: number = 1; // Current page, initialized to 1
  pageSize: number = 5; // Number of items per page
  selectedSede: string = ''; // To store selected sede filter value
  sedes: string[] = Object.values(Sede); // To store the list of sedes
  selectedOrder: string = 'nombre'; // To store selected order filter value
  searchText: string = ''; // To store the search text
  documentoExcelEnviar: File | null = null;
  constructor(
    private gestorEstudiantes: GestorEstudiantes,
    private gestorAutenticacion: GestorAutenticacion
  ) {
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
  hasPrivileges(): boolean {
    var user = this.gestorAutenticacion.getCurrentUser();

    if (user !== null) {
      if (user.rol === 'admin' || user.rol === 'profesor guia' || user.rol === 'coordinador') {
        return true;
      }
    }

    return false;
  }
  
  seleccionarEstudiante(estudiante: Estudiante): void {
    this.estudianteSeleccionado = estudiante;
  }

  changeEditMode(mode: boolean): void {
    this.editMode = mode;
  }

  onFilterChange(): void {
  }

  onSearchChange(): void {
  }
}

