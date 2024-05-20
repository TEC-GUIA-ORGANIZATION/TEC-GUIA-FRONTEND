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
import { ProfesorGuia } from '../../models/profesor-guia.model';
import { GestorProfesoresGuia } from '../../services/gestor-profesores-guia.service';
import { GestorAutenticacion } from '../../services/gestor-autenticacion.service';
import { GestorBlobStorage } from '../../services/gestor-blob-storage.service';

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
  responsables: ProfesorGuia[] = [];
  isEditable: boolean = false;
  estados: string[] = Object.values(EstadoActividad);
  modalidades: string[] = Object.values(ModalidadActividad);
  tipos: string[] = Object.values(TipoActividad);
  nuevaFecha: string = '';
  nuevaHora: string = '';
  newPoster: File | null = null;

  constructor(
    private gestorActividadesService: GestorActividades,
    private gestorProfesoresGuia: GestorProfesoresGuia,
    private gestorAutenticacion: GestorAutenticacion,
    private gestorBlobStorage: GestorBlobStorage,
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

      var tempDate = new Date(this.actividad.fecha);
      this.nuevaFecha = `${tempDate.getFullYear()}-${(tempDate.getMonth() + 1).toString().padStart(2, '0')}-${tempDate.getDate().toString().padStart(2, '0')}`;
      this.nuevaHora = `${tempDate.getHours().toString().padStart(2, '0')}:${tempDate.getMinutes().toString().padStart(2, '0')}`;
    });

    this.gestorProfesoresGuia.getProfesoresGuia().subscribe((profesores) => {
      profesores = profesores.filter(profesor => profesor.sede === this.gestorAutenticacion.getCurrentUser()!.sede);
      this.responsables = profesores;
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

    this.actividad.fecha = new Date(`${this.nuevaFecha}T${this.nuevaHora}`);

    this.gestorActividadesService.updateActividad(
      this.actividad.id,
      this.actividad.nombre,
      this.actividad.descripcion,
      "",
      this.actividad.fecha,
      this.actividad.semana,
      this.actividad.responsable.id,
      this.actividad.tipo,
      this.actividad.estado,
      this.actividad.diasPreviosAnunciar,
      this.actividad.diasRequeridosRecordatorio,
      this.actividad.modalidad,
      this.actividad.lugarEnlace
    ).subscribe((response: any) => {
      if (this.newPoster !== null) {
        var fileName = this.newPoster.name;
        var activityId = response._id;
        this.gestorBlobStorage.uploadFile('posters', activityId + '-' + fileName, this.newPoster).then((url) => {
          this.gestorActividadesService.updateActividadPoster(activityId, url).subscribe(_ => {
            this.actividad!.poster = url;
          }, _ => {
            console.log('Error uploading poster');
          });
        });
      } else {
        this.gestorActividadesService.updateActividadPoster(this.actividad!.id, this.actividad!.poster).subscribe(_ => {
        });
      }
      this.isEditable = false;
    });
  }

  cancelEditActivity() {
    this.isEditable = false;
  }

  onFileSelected(event: any) {
    if (this.actividad === null) {
      return;
    }

    this.newPoster = event.target.files[0];
  }

  isAdmin() {
    return this.gestorAutenticacion.getCurrentUser()!.rol === 'admin';
  }
}
