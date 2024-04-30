import { Sede } from './sede.model';

// This class is used to represent a student in the system
export class Estudiante {
  id: number;
  correo: string;
  nombre: string;
  primerApellido: string;
  segundoApellido: string;
  telefono: string;
  sede: Sede;

  /**
   * Constructor
   * @param id The ID of the student
   * @param correo The email of the student
   * @param nombre The name of the student
   * @param primerApellido The first last name of the student
   * @param segundoApellido The second last name of the student
   * @param telefono The phone number of the student
   * @param sede The headquarters of the student
   **/
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

  /**
   * This method returns the full name of the student
   * @returns The full name of the student
   **/
  getNombreCompleto(): string {
    return `${this.nombre} ${this.primerApellido} ${this.segundoApellido}`;
  }
}
