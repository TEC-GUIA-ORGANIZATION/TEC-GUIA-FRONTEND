import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { MaterialModule } from '../../material/material.module';
import { GestorActividades } from '../../services/gestor-actividades.service';
import { GestorAutenticacion } from '../../services/gestor-autenticacion.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { Actividad } from '../../models/actividad.model';
import { EstadoActividad } from '../../models/estado-actividad.model';
import { GestorPlanTrabajo } from '../../services/gestor-planes-trabajo.service';
import { CommonModule } from '@angular/common';
import { ViewChild, ElementRef } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-actividades',
  templateUrl: './actividades.component.html',
  styleUrl: './actividades.component.css',
  imports: [
    NavbarComponent,
    MaterialModule,
    RouterLink,
    NgxPaginationModule,
    FormsModule,
    CommonModule
  ]
})
export class ActividadesComponent{
  @ViewChild('planningConfirmationModal') planningConfirmationModal!: ElementRef;

  originalActividades: Actividad[] = [];
  actividades: Actividad[] = [];
  estados: string[] = Object.values(EstadoActividad);
  p: number = 1; // Current page, initialized to 1
  selectedEstado: string = '';
  selectedDateSort: string = 'asc';
  searchText: string = '';
  confirmationPlanningMessage: string = '';

  constructor(
    private gestorPlanes:GestorPlanTrabajo,
    private gestor: GestorActividades, private gestorAutenticacion: GestorAutenticacion) {
      this.getActividades()
  }

  getActividades() {
    this.gestor.getActividades().subscribe(actividades => {
      if (actividades === null) {
        return;
      }
      this.actividades = actividades;
      this.originalActividades = actividades;
    });
  }

  isCoordinador(): boolean {
    return this.gestorAutenticacion.getCurrentUser()?.rol === 'coordinador';
  }

  isAsistenteAdministrativo(): boolean {
    return this.gestorAutenticacion.getCurrentUser()?.rol === 'admin';
  }

  createPlanning() {
    this.gestorPlanes.createPlanning().subscribe(
      (response) => {
        if (response ==  undefined) {
          console.log('Error al crear plan: no se pudo obtener la respuesta del servidor');
          this.confirmationPlanningMessage = `Error al crear el plan para campus ${this.gestorAutenticacion.getCurrentUser()?.sede}.`;
          this.showModal();
        } else {
        console.log('Planificación creada con éxito:', response);
        this.confirmationPlanningMessage = `Plan creado para campus ${this.gestorAutenticacion.getCurrentUser()?.sede}`;
        }
        this.showModal();
      },
      (error) => {
        console.log('Error al crear plan:', error);
        this.confirmationPlanningMessage = `Error al crear el plan para campus ${this.gestorAutenticacion.getCurrentUser()?.sede}. `;
        this.showModal();
      }
    );
  }

  showModal() {
    const modalElement = document.getElementById('planningConfirmationModal');
    if (modalElement) {
      modalElement.classList.add('show'); // Agrega la clase 'show' para mostrar el modal
      modalElement.style.display = 'block'; // Cambia el estilo para mostrar el modal
    }
  }

  closeModal() {
    const modalElement = document.getElementById('planningConfirmationModal');
    if (modalElement) {
      modalElement.classList.remove('show'); // Elimina la clase 'show' para ocultar el modal
      modalElement.style.display = 'none'; // Cambia el estilo para ocultar el modal
    }
  }

  hasPrivileges(): boolean {
    var user = this.gestorAutenticacion.getCurrentUser();

    if (user !== null) {
      if (user.rol === 'coordinador') {
        return true;
      }
    }

    return false;
  }

  onFilterChange() {
    this.actividades = this.originalActividades.filter(actividad => {
      if (this.selectedEstado !== '') {
        if (actividad.estado !== this.selectedEstado) {
          return false;
        }
      }

      return true;
    });
  }

  onSortChange() {
    if (this.selectedDateSort === 'asc') {
      this.actividades = this.actividades.sort((a, b) => {
        return a.fecha.getTime() - b.fecha.getTime();
      });
    } else {
      this.actividades = this.actividades.sort((a, b) => {
        return b.fecha.getTime() - a.fecha.getTime();
      });
    }
  }

  onSearchChange() {
    this.actividades = this.originalActividades.filter(actividad => {
      return actividad.nombre.toLowerCase().includes(this.searchText.toLowerCase());
    });
  }
}
