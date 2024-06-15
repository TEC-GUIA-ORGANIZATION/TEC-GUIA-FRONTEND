import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { ActivatedRoute, Router } from '@angular/router';
import { GestorActividades } from '../../services/gestor-actividades.service';
import { GestorBlobStorage } from '../../services/gestor-blob-storage.service';
import { Actividad } from '../../models/actividad.model';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { GestorEvidencia } from '../../services/gestor-evidencia.service';
import { GestorAutenticacion } from '../../services/gestor-autenticacion.service';

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
  backupGrabacion: string = '';
  file: File | null = null;
  p1: number = 1;
  p2: number = 1;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private gestorAutenticacion: GestorAutenticacion,
    private gestorActividadesService: GestorActividades,
    private gestorBlobStorageService: GestorBlobStorage,
    private gestorEvidenciaService: GestorEvidencia
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

    // TODO: Show a message to the user when the link is updated
    this.gestorEvidenciaService.updateRecordingLink(this.actividadId, this.grabacion).subscribe(() => {
    }, (error) => {
      console.log('Error al actualizar link de grabación:', error);
    });
  }

  editRecordingLink() {
    this.backupGrabacion = this.actividad!.evidencia.linkGrabacion;
    this.grabacion = this.actividad!.evidencia.linkGrabacion;
    this.actividad!.evidencia.linkGrabacion = '';
  }

  cancelRecordingLink() {
    this.actividad!.evidencia.linkGrabacion = this.backupGrabacion;
    this.backupGrabacion = '';
    this.grabacion = '';
  }

  uploadAsistencia() {
    this.uploadAsistenciaIsVisible = true;
  }

  uploadAsistenciaFile() {
    if (this.file !== null) {
      this.gestorBlobStorageService.uploadFile('attendance', this.actividad?.id + '-' + this.file.name, this.file).then(() => {
        var url = this.gestorBlobStorageService.getFileUrl('attendance', this.actividad?.id + '-' + this.file!.name);

        this.gestorEvidenciaService.updateAttendance(this.actividadId, url)?.subscribe(() => {
          this.asistencias.push(url);
          this.file = null;
          this.uploadAsistenciaIsVisible = false;
        }, (error) => {
          console.log('Error al actualizar asistencia:', error);
        });
      }).catch((error) => {
        console.log('Error al subir archivo:', error);
      });
    } else {
      console.log('No hay archivo para subir');
    }
  }

  cancelUploadAsistencia() {
    this.uploadAsistenciaIsVisible = false;
  }

  eliminarAsistenciaActual() {
    if (this.asistencias.length === 0) {
      return;
    }

    var fileName = this.asistencias[this.p1 - 1].split('/')!.pop()!.split('?')[0];
    this.gestorBlobStorageService.deleteFile('attendance', fileName).then(() => {
      this.gestorEvidenciaService.deleteAttendance(this.actividadId, this.p1 - 1).subscribe(() => {
        this.asistencias.splice(this.p1 - 1, 1);
        this.p1 = this.p1 === 1 ? 1 : this.p1 - 1;
      }, (error) => {
        console.log('Error al eliminar archivo:', error);
      });
    }, (error) => {
      console.log('Error al eliminar archivo:', error);
    });
  }

  uploadParticipante() {
    this.uploadParticipanteIsVisible = true;
  }

  uploadParticipanteFile() {
    if (this.file !== null) {
      this.gestorBlobStorageService.uploadFile('participants', this.actividad?.id + '-' + this.file.name, this.file).then(() => {
        var url = this.gestorBlobStorageService.getFileUrl('participants', this.actividad?.id + '-' + this.file!.name);

        this.gestorEvidenciaService.updateParticipants(this.actividadId, url)?.subscribe(() => {
          this.participantes.push(url);
          this.file = null;
          this.uploadParticipanteIsVisible = false;
        }, (error) => {
          console.log('Error al actualizar participante:', error);
        });
      }).catch((error) => {
        console.log('Error al subir archivo:', error);
      });
    } else {
      console.log('No hay archivo para subir');
    }
  }

  cancelUploadParticipante() {
    this.uploadParticipanteIsVisible = false;
  }

  eliminarParticipanteActual() {
    if (this.participantes.length === 0) {
      return;
    }

    var fileName = this.participantes[this.p2 - 1].split('/')!.pop()!.split('?')[0];
    this.gestorBlobStorageService.deleteFile('participants', fileName).then(() => {
      this.gestorEvidenciaService.deleteParticipant(this.actividadId, this.p2 - 1).subscribe(() => {
        this.participantes.splice(this.p2 - 1, 1);
        this.p2 = this.p2 === 1 ? 1 : this.p2 - 1;
      }, (error) => {
        console.log('Error al eliminar archivo:', error);
      });
    }, (error) => {
      console.log('Error al eliminar archivo:', error);
    });
  }

  onFileSelected(event: any) {
    this.file = event.target.files[0];
  }

  isStudent(): boolean {
    return this.gestorAutenticacion.getCurrentUserRol() === 'estudiante';
  }
}
