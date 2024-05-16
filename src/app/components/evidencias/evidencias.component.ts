import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { ActivatedRoute, Router } from '@angular/router';
import { GestorActividades } from '../../services/gestor-actividades.service';
import { Actividad } from '../../models/actividad.model';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  standalone: true,
  selector: 'app-evidencias',
  templateUrl: './evidencias.component.html',
  styleUrls: ['./evidencias.component.css'],
  imports: [
    NavbarComponent,
    CommonModule,
    FormsModule,
    NgxPaginationModule
  ]
})
export class EvidenciasComponent {
  actividadId: string = '';
  actividad: Actividad | null = null;
  asistencias: string[] = [];
  uploadAsistenciaIsVisible: boolean = false;
  participantes: string[] = [];
  uploadParticipanteIsVisible: boolean = false;
  grabacion: string = '';
  p1: number = 0;
  p2: number = 0;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private gestorActividadesService: GestorActividades,
  ) {
    this.actividadId = this.route.snapshot.params['id'];

    this.gestorActividadesService.getActividad(this.actividadId).subscribe((actividad: Actividad | null) => {
      if (actividad === null) {
        return;
      }

      this.actividad = actividad;

      this.asistencias = actividad.evidencia.asistencia;
      if (this.asistencias.length > 0) {
        this.p1 = 1;
      }
      this.participantes = actividad.evidencia.participantes;
      if (this.participantes.length > 0) {
        this.p2 = 1;
      }
    });
  }

  goBack() {
    this.router.navigate(['/actividad/' + this.actividadId]);
  }

  uploadRecordingLink() {
    this.actividad!.evidencia.linkGrabacion = this.grabacion;
    // TODO: Send to backend
  }

  editRecordingLink() {
    this.actividad!.evidencia.linkGrabacion = '';
    // TODO: Send to backend
  }

  uploadAsistencia() {
    this.uploadAsistenciaIsVisible = true;
  }

  cancelUploadAsistencia() {
    this.uploadAsistenciaIsVisible = false;
  }

  eliminarAsistenciaActual() {
    if (this.asistencias.length === 0) {
      return;
    }

    this.asistencias.splice(this.p1-1, 1);
    this.p1 = this.p1 - 1;
    // TODO: Send to backend
  }

  uploadParticipante() {
    this.uploadParticipanteIsVisible = true;
  }

  cancelUploadParticipante() {
    this.uploadParticipanteIsVisible = false;
  }

  eliminarParticipanteActual() {
    if (this.participantes.length === 0) {
      return;
    }

    this.participantes.splice(this.p2-1, 1);
    this.p2 = this.p2 - 1;
    // TODO: Send to backend
  }

  onFileSelected(event: any) {
    // TODO: Implement
  }
}
