import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { ProfesorGuia } from '../../models/profesor-guia.model';
import { Sede } from '../../models/sede.model';
import { GestorAutenticacion } from '../../services/gestor-autenticacion.service';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  standalone: true,
  selector: 'app-equipo',
  templateUrl: './equipo.component.html',
  styleUrl: './equipo.component.css',
  imports: [
    CommonModule,
    NavbarComponent,
    NgxPaginationModule
  ]
})
export class EquipoComponent {
  pageSize: number = 5; // Number of items per page
  p: number = 1; // Current page, initialized to 1
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
  ];
  profesorSeleccionado: ProfesorGuia | null = null;
  editMode: boolean = false;

  constructor(private gestorAutenticacion: GestorAutenticacion) {}

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
