import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { ProfesorGuia } from '../../models/profesor-guia.model';
import { Sede } from '../../models/sede.model';
import { GestorAutenticacion } from '../../services/gestor-autenticacion.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { GestorProfesoresGuia } from '../../services/gestor-profesores-guia.service';

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
  profesores: ProfesorGuia[] = [];

  constructor(
    private gestorAutenticacion: GestorAutenticacion,
    private gestorProfesoresGuia: GestorProfesoresGuia
  ) {
    this.gestorProfesoresGuia.getProfesoresGuia().subscribe((profesores) => {
      if (this.isAdmin()) {
        this.profesores = profesores.filter(profesor => profesor.sede === this.gestorAutenticacion.getCurrentUser()?.sede);
      }
      else{
        this.profesores = profesores;
      }
      
      this.originalProfesores = [...profesores];
    });
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
  filterProfesores() {
    // Filter profesores based on selectedSede and selectedCoordinador
    this.profesores = this.originalProfesores.filter(profesor => {
      let sedeFilter = !this.selectedSede || profesor.sede === this.selectedSede;
      let coordinadorFilter = !this.selectedCoordinador || profesor.rol.includes(this.selectedCoordinador);
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
      if (user.id === profesor.id) {
        return true;
      }
    }

    return false;
  }

  isCurrentUserSameCampus(profesor: ProfesorGuia): boolean {
    var user = this.gestorAutenticacion.getCurrentUser();

    if (user !== null) {
      if (user.sede === profesor.sede) {
        return true;
      }
    }

    return false;
  }

  changeEditMode(mode: boolean): void {
    this.editMode = mode;
  }

  darDeBaja(profesor: ProfesorGuia): void {
    this.gestorProfesoresGuia.changeState(profesor.id).subscribe(() => {
      this.profesores = this.profesores.filter(p => p.id !== profesor.id);
      this.originalProfesores = this.originalProfesores.filter(p => p.id !== profesor.id);
      this.profesorSeleccionado = null;
    });
  }
}
