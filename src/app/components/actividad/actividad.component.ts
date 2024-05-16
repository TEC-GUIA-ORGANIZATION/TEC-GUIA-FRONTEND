import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { Actividad } from '../../models/actividad.model';
import { GestorActividades } from '../../services/gestor-actividades.service';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { ModalidadActividad } from '../../models/modalidad-actividad.model';

@Component({
  standalone: true,
  selector: 'app-actividad',
  templateUrl: './actividad.component.html',
  styleUrls: ['./actividad.component.css'],
  imports: [
    NavbarComponent,
    RouterLink,
    CommonModule
  ]
})
export class ActividadComponent {
  actividadId: string = '';
  actividad: Actividad | null = null;
  responsables: string[] = [];

  constructor(
    private gestorActividadesService: GestorActividades,
    private route: ActivatedRoute,
    private router: Router
  ) {
    // Load the activity data
    this.actividadId = this.route.snapshot.params['id'];

    this.gestorActividadesService.getActividad(this.actividadId).subscribe((actividad: Actividad | null) => {
      if (actividad === null) {
        return;
      }

      this.actividad = actividad;
    });
  }

  showComments() {
    this.router.navigate(['actividad', this.actividadId, 'comentarios']);
  }

  getPlaceLinkLabel() {
    if (this.actividad === null) {
      return '';
    }

    if (this.actividad.modalidad === ModalidadActividad.PRESENCIAL) {
      return "Lugar";
    } else {
      return "Enlace";
    }
  }

  getDate() {
    if (this.actividad === null) {
      return '';
    }

    return new Date(this.actividad.fecha).toLocaleDateString();
  }

  getTime() {
    if (this.actividad === null) {
      return '';
    }

    return new Date(this.actividad.fecha).toLocaleTimeString();
  }

  goBack() {
    this.router.navigate(['/actividades']);
  }
}
