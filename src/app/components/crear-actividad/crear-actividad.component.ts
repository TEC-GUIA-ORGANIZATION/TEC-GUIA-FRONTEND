import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GestorActividades } from '../../services/gestor-actividades.service';
import { NavbarComponent } from '../navbar/navbar.component';
import { MaterialModule } from '../../material/material.module';
import { FormsModule } from '@angular/forms';
import { ModalidadActividad } from '../../models/modalidad-actividad.model';
import { EstadoActividad } from '../../models/estado-actividad.model';
import { TipoActividad } from '../../models/tipo-actividad.model';
import { GestorBlobStorage } from '../../services/gestor-blob-storage.service';
import { ProfesorGuia } from '../../models/profesor-guia.model';
import { GestorProfesoresGuia } from '../../services/gestor-profesores-guia.service';
import { GestorAutenticacion } from '../../services/gestor-autenticacion.service';

@Component({
  standalone: true,
  selector: 'app-crear-actividad',
  templateUrl: './crear-actividad.component.html',
  styleUrl: './crear-actividad.component.css',
  imports: [
    NavbarComponent,
    MaterialModule,
    FormsModule
  ]
})
export class CrearActividadComponent implements OnInit {
  error: string = '';
  nombre: string = '';
  descripcion: string = '';
  poster: File | null = null;
  fecha: string = '';
  hora: string = '';
  semana: number = 1;
  responsable: string = '';
  tipo: TipoActividad = TipoActividad.ORIENTADORA;
  estado: EstadoActividad = EstadoActividad.PLANEADA;
  diasPreviosAnunciar: number = 0;
  diasRequeridosRecordatorio: number = 0;
  modalidad: ModalidadActividad = ModalidadActividad.REMOTA;
  lugarEnlace: string = '';
  responsables: ProfesorGuia[] = [];
  estados: string[] = [];
  modalidades: string[] = [];
  tipos: string[] = [];

  constructor(
    private gestorActividades: GestorActividades,
    private router: Router,
    private gestorBlobStorage: GestorBlobStorage,
    private gestorProfesoresGuia: GestorProfesoresGuia,
    private gestorAutenticacion: GestorAutenticacion
  ) { }

  ngOnInit(): void {
    this.estados = Object.values(EstadoActividad);
    this.modalidades = Object.values(ModalidadActividad);
    this.tipos = Object.values(TipoActividad);

    this.gestorProfesoresGuia.getProfesoresGuia().subscribe((profesores) => {
      this.responsables = profesores;
    });
  }

  getPlaceLinkLabel() {
    return this.modalidad === ModalidadActividad.PRESENCIAL ? 'Lugar' : 'Enlace';
  }

  save() {
    if (!this.validate()) {
      return;
    }

    this.gestorActividades.createActividad(
      this.nombre,
      this.descripcion,
      '',
      new Date(this.fecha + 'T' + this.hora),
      this.semana,
      this.responsable,
      this.tipo,
      this.estado,
      this.diasPreviosAnunciar,
      this.diasRequeridosRecordatorio,
      this.modalidad,
      this.lugarEnlace,
      this.gestorAutenticacion.getCurrentUser()!.sede
    ).subscribe((item: any) => {
      if (this.poster !== null) {
        var fileName = this.poster.name;
        this.gestorBlobStorage.uploadFile('posters', item._id + '-' + fileName, this.poster).then((url) => {
          this.gestorActividades.updateActividadPoster(item._id, url).subscribe(() => {
            console.log('File uploaded successfully');
          }, error => {
            console.error('Error updating file: ' + error);
          });
        }, error => {
          console.error('Error uploading file: ' + error);
        });
      }
      this.router.navigate(['/actividades']);
    }, error => {
      console.error(error);
    });
  }

  goBack() {
    this.router.navigate(['/actividades']);
  }

  onFileSelected(event: any) {
    this.poster = event.target.files[0];
  }

  validate(): boolean {
    if (this.nombre === '') {
      this.error = 'El nombre no puede estar vacío';
      return false;
    }

    if (this.fecha === '') {
      this.error = 'La fecha no puede estar vacía';
      return false;
    }

    if (this.hora === '') {
      this.error = 'La hora no puede estar vacía';
      return false;
    }

    if (this.descripcion === '') {
      this.error = 'La descripción no puede estar vacía';
      return false;
    }

    if (this.responsable === '') {
      this.error = 'El responsable no puede estar vacío';
      return false;
    }

    if (this.diasPreviosAnunciar < 0) {
      this.error = 'Los días previos a anunciar no pueden ser negativos';
      return false;
    }

    if (this.diasRequeridosRecordatorio < 0) {
      this.error = 'Los días requeridos para recordatorio no pueden ser negativos';
      return false;
    }

    if (this.semana < 1 || this.semana > 16) {
      this.error = 'La semana debe estar entre 1 y 16';
      return false;
    }

    if (this.modalidad === ModalidadActividad.PRESENCIAL && this.lugarEnlace === '') {
      this.error = 'El lugar no puede estar vacío';
      return false;
    }

    if (this.modalidad === ModalidadActividad.REMOTA && this.lugarEnlace === '') {
      this.error = 'El enlace no puede estar vacío';
      return false;
    }

    return true;
  }
}
