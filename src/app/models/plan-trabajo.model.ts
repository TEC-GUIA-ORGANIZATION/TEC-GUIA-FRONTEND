import { Semestre } from './semestre.model';
import { Actividad } from './actividad.model';

export class PlanTrabajo {
  id: number;
  semestre: Semestre;
  fechaInicio: Date;
  fechaFin: Date;
  actividades: Actividad[];

  constructor(
    id: number,
    semestre: Semestre,
    fechaInicio: Date,
    fechaFin: Date,
    actividades: Actividad[]
  ) {
    this.id = id;
    this.semestre = semestre;
    this.fechaInicio = fechaInicio;
    this.fechaFin = fechaFin;
    this.actividades = actividades;
  }

  obtenerProximaActividad(): Actividad | null {
    // This method returns the next activity to be executed.
    let proximaActividad: Actividad | null = null;
    let fechaActual: Date = new Date();
    for (let actividad of this.actividades) {
      if (actividad.fecha >= fechaActual) {
        if (proximaActividad == null || actividad.fecha < proximaActividad.fecha) {
          proximaActividad = actividad;
        }
      }
    }
    return proximaActividad;
  }
}
