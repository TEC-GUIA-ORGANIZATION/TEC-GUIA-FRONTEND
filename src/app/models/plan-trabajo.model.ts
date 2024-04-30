import { Semestre } from './semestre.model';
import { Actividad } from './actividad.model';

// This class is used to represent a work plan in the system
export class PlanTrabajo {
  id: number;
  semestre: Semestre;
  fechaInicio: Date;
  fechaFin: Date;
  actividades: Actividad[];

  /**
   * Constructor
   * @param id The ID of the work plan
   * @param semestre The semester of the work plan
   * @param fechaInicio The start date of the work plan
   * @param fechaFin The end date of the work plan
   * @param actividades The activities of the work plan
   **/
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

  /**
   * This method returns the next activity to be executed
   * @returns The next activity to be executed
   **/
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
