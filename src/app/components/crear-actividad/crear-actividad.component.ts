import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { GestorActividades } from '../../services/gestor-actividades.service';
import { NgForm } from '@angular/forms'; // Asegúrate de importar NgForm desde @angular/forms

import { NavbarComponent } from '../navbar/navbar.component';
import { MaterialModule } from '../../material/material.module';
import { FormsModule } from '@angular/forms';

export interface Actividad {
  week: number;
  activity: string;
  activityName: string;
  responsible: string[];
  daysToAnnounce: number;
  daysToRemember: number;
  isInPerson: boolean;
  meetingLink: string;
  poster: File | null;
  activityStatus: string;
  evidence: {
    attendancePhoto: File | null;
    participantsPhoto: File | null;
    recordingLink: string |null;
  };
}
@Component({
  standalone: true,
  selector: 'app-crear-actividad',
  templateUrl: './crear-actividad.component.html',
  styleUrl: './crear-actividad.component.css',
  imports: [NavbarComponent, MaterialModule, FormsModule]
})

export class CrearActividadComponent {
  @ViewChild('actividadForm') actividadForm: NgForm|undefined; // Declara una variable para obtener una referencia al formulario
  edicionHabilitada: boolean = false;
  touchedParticipants: boolean= false; // Propiedad para determinar si un campo ha sido tocado
  touchedAttendance: boolean= false; // Propiedad para determinar si un campo ha sido tocado
  touchedRecording: boolean= false; // Propiedad para determinar si un campo ha sido tocado
  activityStatusTypes = ['PLANEADA', 'NOTIFICADA', 'REALIZADA', 'CANCELADA']; // Tipos de estado de actividad
  activityTypes: string[] = ['Orientadora', 'Motivacional', 'De apoyo a la vida estudiantil', 'De orden tecnico', 'De recreacion'];


  actividad: Actividad = {
    week: 1,
    activity: "Orientadora",
    activityName: " ",
    responsible: [" "],
    daysToAnnounce: 1,
    daysToRemember: 1,
    isInPerson: false,
    meetingLink: " ",
    poster: null,
    activityStatus: "PLANEADA",
    evidence: {
      attendancePhoto: null,
      participantsPhoto: null,
      recordingLink: null
    },
  };

  constructor(private gestorActividades: GestorActividades, private router: Router) { }

  async enviarActividad() {
    if (this.actividadForm && this.actividadForm.controls) {
      try {
        await this.gestorActividades.addActividad(
          this.actividad.week,
          this.actividad.activity,
          this.actividad.activityName,
          this.actividad.responsible,
          this.actividad.daysToAnnounce,
          this.actividad.daysToRemember,
          this.actividad.isInPerson,
          this.actividad.meetingLink,
          this.actividad.poster,
          this.actividad.activityStatus,
          this.actividad.evidence.attendancePhoto,
          this.actividad.evidence.participantsPhoto,
          this.actividad.evidence.recordingLink,
        );
        // Reiniciar el formulario o realizar alguna acción después de enviar los datos
      } catch (error) {
        console.error('Error al enviar la actividad:', error);
        // Manejar el error adecuadamente
      }
    }
  }

  onAttendancePhotoSelected(event: any) {
    this.actividad.evidence.attendancePhoto = event.target.files[0];
    this.touchedAttendance = true;
  }

  onParticipantsPhotoSelected(event: any) {
    this.actividad.evidence.participantsPhoto = event.target.files[0];
    this.touchedParticipants = true;
  }

  onPosterPhotoSelected(event: any) {
    this.actividad.poster = event.target.files[0];
  }

  habilitarEdicion() {
    this.edicionHabilitada = !this.edicionHabilitada;
  }

  irPaginaPrincipal() {
    this.router.navigate(['/actividades']);
  }
}
