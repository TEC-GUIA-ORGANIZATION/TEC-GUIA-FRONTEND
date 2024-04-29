import { Sede } from './sede.model';

export class Estudiante {
  id: number;
  correo: string;
  nombre: string;
  primerApellido: string;
  segundoApellido: string;
  telefono: string;
  sede: Sede;

  constructor(
    id: number,
    correo: string,
    nombre: string,
    primerApellido: string,
    segundoApellido: string,
    telefono: string,
    sede: Sede
  ) {
    this.id = id;
    this.correo = correo;
    this.nombre = nombre;
    this.primerApellido = primerApellido;
    this.segundoApellido = segundoApellido;
    this.telefono = telefono;
    this.sede = sede;
  }

  getNombreCompleto(): string {
    return `${this.nombre} ${this.primerApellido} ${this.segundoApellido}`;
  }
}
