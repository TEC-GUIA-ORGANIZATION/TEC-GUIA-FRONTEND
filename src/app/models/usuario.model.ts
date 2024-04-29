import { Sede } from './sede.model';

export class Usuario {
  id: number;
  correo: string;
  contrasena: string;
  nombre: string;
  primerApellido: string;
  segundoApellido: string;
  sede: Sede;
  fotografia: string;

  constructor(
    id: number,
    correo: string,
    contrasena: string,
    nombre: string,
    primerApellido: string,
    segundoApellido: string,
    sede: Sede,
    fotografia: string
  ) {
    this.id = id;
    this.correo = correo;
    this.contrasena = contrasena;
    this.nombre = nombre;
    this.primerApellido = primerApellido;
    this.segundoApellido = segundoApellido;
    this.sede = sede;
    this.fotografia = fotografia;
  }

  obtenerNombreCompleto(): string {
    return `${this.nombre} ${this.primerApellido} ${this.segundoApellido}`;
  }
}
