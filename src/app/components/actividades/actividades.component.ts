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
    FormsModule
  ]
})
export class ActividadesComponent {
  originalActividades: Actividad[] = [];
  actividades: Actividad[] = [];
  estados: string[] = Object.values(EstadoActividad);
  p: number = 1; // Current page, initialized to 1
  selectedEstado: string = '';
  selectedDateSort: string = 'asc';
  searchText: string = '';

  constructor(private gestor: GestorActividades, private gestorAutenticacion: GestorAutenticacion) {
    this.getActividades()
  }

  getActividades(){
    this.gestor.getActividades().subscribe(actividades => {
      if (actividades === null) {
        return;
      }
      this.actividades = actividades;
      this.originalActividades = actividades;
    });
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
