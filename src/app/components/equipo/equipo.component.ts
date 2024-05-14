import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';

import { ProfesorGuia } from '../../models/profesor-guia.model';
import { Sede } from '../../models/sede.model';

@Component({
  standalone: true,
  selector: 'app-equipo',
  templateUrl: './equipo.component.html',
  styleUrl: './equipo.component.css',
  imports: [
    CommonModule,
    NavbarComponent
  ]
})
export class EquipoComponent {
  profesores: ProfesorGuia[] = [
    new ProfesorGuia(
      1,
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
      2,
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

  constructor() { }

  seleccionarProfesor(profesor: ProfesorGuia): void {
    this.profesorSeleccionado = profesor;
  }
}
