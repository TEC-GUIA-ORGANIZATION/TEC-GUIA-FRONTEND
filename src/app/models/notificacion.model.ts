import { Actividad } from "./actividad.model";

// Notificacion model
// This model is used to represent a notification in the system
export class Notificacion {
  id: string;
  contenido: string;
  fecha: Date;
  // emisor: Actividad;
  emisor: string;
  leida: boolean;

  constructor(
    id: string,
    contenido: string,
    fecha: Date,
    // emisor: Actividad,
    emisor: string,
    leida: boolean
  ) {
    this.id = id;
    this.contenido = contenido;
    this.fecha = fecha;
    this.emisor = emisor;
    this.leida = leida;
  }
}
