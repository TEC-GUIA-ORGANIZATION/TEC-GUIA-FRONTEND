import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { GestorEstudiantes } from '../../services/gestor-estudiantes.service';
import { FormsModule } from '@angular/forms';
import { GestorAutenticacion } from '../../services/gestor-autenticacion.service';
import { Estudiante } from '../../models/estudiante.model';
import { NgxPaginationModule } from 'ngx-pagination';
import { Sede } from '../../models/sede.model';

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
  estudiantes: Estudiante[] = []
  estudianteSeleccionado: Estudiante | null = null;
  editMode: boolean = false;
  p: number = 1; // Current page, initialized to 1
  pageSize: number = 5; // Number of items per page
  selectedSede: string = ''; // To store selected sede filter value
  sedes: string[] = Object.values(Sede); // To store the list of sedes
  selectedOrder: string = 'nombre'; // To store selected order filter value
  searchText: string = ''; // To store the search text

  constructor(
    private gestorEstudiantes: GestorEstudiantes,
    private gestorAutenticacion: GestorAutenticacion
  ) {
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

