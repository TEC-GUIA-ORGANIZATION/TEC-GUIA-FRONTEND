import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { Actividad } from '../../models/actividad.model';
import { GestorActividades } from '../../services/gestor-actividades.service';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { ModalidadActividad } from '../../models/modalidad-actividad.model';
import { FormsModule } from '@angular/forms';
import { EstadoActividad } from '../../models/estado-actividad.model';
import { TipoActividad } from '../../models/tipo-actividad.model';

@Component({
  standalone: true,
  selector: 'app-actividad',
  templateUrl: './actividad.component.html',
  styleUrls: ['./actividad.component.css'],
  imports: [
    NavbarComponent,
    RouterLink,
    CommonModule,
    FormsModule
  ]
})
export class ActividadComponent {
  actividadId: string = '';
  actividad: Actividad | null = null;
  responsables: string[] = [];
  isEditable: boolean = false;
  estados: string[] = Object.values(EstadoActividad);
  modalidades: string[] = Object.values(ModalidadActividad);
  tipos: string[] = Object.values(TipoActividad);
  nuevaFecha: Date = new Date();
  nuevaHora: string = '';

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

  showEvidences() {
    this.router.navigate(['actividad', this.actividadId, 'evidencias']);
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

  editActivity() {
    this.isEditable = true;
  }

  saveActivity() {
    if (this.actividad === null) {
      return;
    }

    this.actividad.fecha = new Date(this.nuevaFecha.toDateString() + ' ' + this.nuevaHora);

    this.gestorActividadesService.updateActividad(this.actividad).subscribe((actividad: Actividad | null) => {
      if (actividad === null) {
        return;
      }

      this.actividad = actividad;
    });

    this.isEditable = false;
  }

  cancelEditActivity() {
    this.isEditable = false;
  }
}
