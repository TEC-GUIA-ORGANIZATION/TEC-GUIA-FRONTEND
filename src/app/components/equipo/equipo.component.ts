import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { ProfesorGuia } from '../../models/profesor-guia.model';
import { Sede } from '../../models/sede.model';
import { GestorAutenticacion } from '../../services/gestor-autenticacion.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-equipo',
  templateUrl: './equipo.component.html',
  styleUrl: './equipo.component.css',
  imports: [
    CommonModule,
    NavbarComponent,
    NgxPaginationModule,
    FormsModule
  ]
})
export class EquipoComponent {
  pageSize: number = 5; // Number of items per page
  p: number = 1; // Current page, initialized to 1
  sedes: string[] = Object.values(Sede); // To store the list of sedes
  selectedSede: string = ''; // To store selected sede filter value
  selectedCoordinador: string = ''; // To store selected coordinador filter value
  profesorSeleccionado: ProfesorGuia | null = null;
  editMode: boolean = false;
  originalProfesores: ProfesorGuia[] = []; // To store the original list of profesores

  profesores: ProfesorGuia[] = [
    new ProfesorGuia(
      '6643c6211bcce33b1cc6056f',
      'profe@gmail.com',
      '123456',
      'Profesor 1',
      'Apellido 1',
      'Apellido 2',
      Sede.CARTAGO,
      'https://blog.prepscholar.com/hs-fs/hubfs/body_professor_laptop.jpg?width=501&name=body_professor_laptop.jpg',
      'Profesor Guía',
      '1',
      '12345678',
      '87654321',
      true,
      true
    ),
    new ProfesorGuia(
      'wfwaafw',
      'profe2@gmail.com',
      '123456',
      'Profesor 2',
      'Apellido 1',
      'Apellido 2',
      Sede.CARTAGO,
      'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Einstein_1921_by_F_Schmutzer_-_restoration.jpg/220px-Einstein_1921_by_F_Schmutzer_-_restoration.jpg',
      'Profesor Guía',
      '1',
      '12345678',
      '87654321',
      false,
      true
    ),
    new ProfesorGuia(
      'wfwaafw',
      'profe2@gmail.com',
      '123456',
      'Profesor 2',
      'Apellido 1',
      'Apellido 2',
      Sede.CARTAGO,
      'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Einstein_1921_by_F_Schmutzer_-_restoration.jpg/220px-Einstein_1921_by_F_Schmutzer_-_restoration.jpg',
      'Profesor Guía',
      '1',
      '12345678',
      '87654321',
      false,
      true
    ),
    new ProfesorGuia(
      'wfwaafw',
      'profe2@gmail.com',
      '123456',
      'Profesor 2',
      'Apellido 1',
      'Apellido 2',
      Sede.CARTAGO,
      'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Einstein_1921_by_F_Schmutzer_-_restoration.jpg/220px-Einstein_1921_by_F_Schmutzer_-_restoration.jpg',
      'Profesor Guía',
      '1',
      '12345678',
      '87654321',
      false,
      true
    ),
    new ProfesorGuia(
      'wfwaafw',
      'profe2@gmail.com',
      '123456',
      'Profesor 2',
      'Apellido 1',
      'Apellido 2',
      Sede.CARTAGO,
      'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Einstein_1921_by_F_Schmutzer_-_restoration.jpg/220px-Einstein_1921_by_F_Schmutzer_-_restoration.jpg',
      'Profesor Guía',
      '1',
      '12345678',
      '87654321',
      false,
      true
    ),
    new ProfesorGuia(
      'wfwaafw',
      'profe2@gmail.com',
      '123456',
      'Profesor 2',
      'Apellido 1',
      'Apellido 2',
      Sede.CARTAGO,
      'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Einstein_1921_by_F_Schmutzer_-_restoration.jpg/220px-Einstein_1921_by_F_Schmutzer_-_restoration.jpg',
      'Profesor Guía',
      '1',
      '12345678',
      '87654321',
      false,
      true
    ),
    new ProfesorGuia(
      'wfwaafw',
      'profe2@gmail.com',
      '123456',
      'Profesor 2',
      'Apellido 1',
      'Apellido 2',
      Sede.CARTAGO,
      'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Einstein_1921_by_F_Schmutzer_-_restoration.jpg/220px-Einstein_1921_by_F_Schmutzer_-_restoration.jpg',
      'Profesor Guía',
      '1',
      '12345678',
      '87654321',
      false,
      true
    ),
    new ProfesorGuia(
      'wfwaafw',
      'profe2@gmail.com',
      '123456',
      'Profesor 2',
      'Apellido 1',
      'Apellido 2',
      Sede.CARTAGO,
      'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Einstein_1921_by_F_Schmutzer_-_restoration.jpg/220px-Einstein_1921_by_F_Schmutzer_-_restoration.jpg',
      'Profesor Guía',
      '1',
      '12345678',
      '87654321',
      false,
      true
    ),
    new ProfesorGuia(
      'wfwaafw',
      'profe2@gmail.com',
      '123456',
      'Profesor 2',
      'Apellido 1',
      'Apellido 2',
      Sede.CARTAGO,
      'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Einstein_1921_by_F_Schmutzer_-_restoration.jpg/220px-Einstein_1921_by_F_Schmutzer_-_restoration.jpg',
      'Profesor Guía',
      '1',
      '12345678',
      '87654321',
      false,
      true
    ),
    new ProfesorGuia(
      'wfwaafw',
      'profe2@gmail.com',
      '123456',
      'Profesor 2',
      'Apellido 1',
      'Apellido 2',
      Sede.CARTAGO,
      'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Einstein_1921_by_F_Schmutzer_-_restoration.jpg/220px-Einstein_1921_by_F_Schmutzer_-_restoration.jpg',
      'Profesor Guía',
      '1',
      '12345678',
      '87654321',
      false,
      true
    ),
    new ProfesorGuia(
      'wfwaafw',
      'profe2@gmail.com',
      '123456',
      'Profesor 2',
      'Apellido 1',
      'Apellido 2',
      Sede.CARTAGO,
      'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Einstein_1921_by_F_Schmutzer_-_restoration.jpg/220px-Einstein_1921_by_F_Schmutzer_-_restoration.jpg',
      'Profesor Guía',
      '1',
      '12345678',
      '87654321',
      false,
      true
    ),
    new ProfesorGuia(
      'wfwaafw',
      'profe2@gmail.com',
      '123456',
      'Profesor 2',
      'Apellido 1',
      'Apellido 2',
      Sede.SAN_JOSE,
      'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Einstein_1921_by_F_Schmutzer_-_restoration.jpg/220px-Einstein_1921_by_F_Schmutzer_-_restoration.jpg',
      'Profesor Guía',
      '1',
      '12345678',
      '87654321',
      false,
      true
    ),
    new ProfesorGuia(
      'wfwaafw',
      'profe2@gmail.com',
      '123456',
      'Profesor 2',
      'Apellido 1',
      'Apellido 2',
      Sede.SAN_CARLOS,
      'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Einstein_1921_by_F_Schmutzer_-_restoration.jpg/220px-Einstein_1921_by_F_Schmutzer_-_restoration.jpg',
      'Profesor Guía',
      '1',
      '12345678',
      '87654321',
      false,
      true
    ),
    new ProfesorGuia(
      'wfwaafw',
      'profe2@gmail.com',
      '123456',
      'Profesor 2',
      'Apellido 1',
      'Apellido 2',
      Sede.SAN_CARLOS,
      'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Einstein_1921_by_F_Schmutzer_-_restoration.jpg/220px-Einstein_1921_by_F_Schmutzer_-_restoration.jpg',
      'Profesor Guía',
      '1',
      '12345678',
      '87654321',
      false,
      true
    ),
  ];

  constructor(private gestorAutenticacion: GestorAutenticacion) {
    this.originalProfesores = [...this.profesores];
  }

  filterProfesores() {
    // Filter profesores based on selectedSede and selectedCoordinador
    this.profesores = this.originalProfesores.filter(profesor => {
      let sedeFilter = !this.selectedSede || profesor.sede === this.selectedSede;
      let coordinadorFilter = !this.selectedCoordinador || profesor.esCoordinador.toString() === this.selectedCoordinador;
      return sedeFilter && coordinadorFilter;
    });
  }

  // Add this method to handle changes in the selectedSede and selectedCoordinador filters
  onFilterChange() {
    this.filterProfesores(); // Call the filterProfesores function to update the list
  }

  seleccionarProfesor(profesor: ProfesorGuia): void {
    this.profesorSeleccionado = profesor;
  }

  hasPrivileges(): boolean {
    var user = this.gestorAutenticacion.getCurrentUser();

    if (user !== null) {
      if (user.rol === 'admin') {
        return true;
      }
    }

    return false;
  }

  hasMainPrivileges(): boolean {
    var user = this.gestorAutenticacion.getCurrentUser();

    if (user !== null) {
      if (user.rol === 'admin' && user.sede === Sede.CARTAGO) {
        return true;
      }
    }

    return false;
  }

  isCurrentUser(profesor: ProfesorGuia): boolean {
    var user = this.gestorAutenticacion.getCurrentUser();

    if (user !== null) {
      if (user.rol === 'profesor guia' && user.id === profesor.id) {
        return true;
      }
    }

    return false;
  }

  changeEditMode(mode: boolean): void {
    this.editMode = mode;
  }
}
