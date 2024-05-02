import { Sede } from './sede.model';

// This class is used to represent a user in the system
export class Usuario {
  id: number;
  correo: string;
  contrasena: string;
  nombre: string;
  primerApellido: string;
  segundoApellido: string;
  sede: Sede;
  fotografia: string;
  rol: string;

  /**
   * Constructor
   * @param id The ID of the user
   * @param correo The email of the user
   * @param contrasena The password of the user
   * @param nombre The name of the user
   * @param primerApellido The first last name of the user
   * @param segundoApellido The second last name of the user
   * @param sede The headquarters of the user
   * @param fotografia The photo of the user
   * @param rol The role of the user
   **/
  constructor(
    id: number,
    correo: string,
    contrasena: string,
    nombre: string,
    primerApellido: string,
    segundoApellido: string,
    sede: Sede,
    fotografia: string,
    rol: string
  ) {
    this.id = id;
    this.correo = correo;
    this.contrasena = contrasena;
    this.nombre = nombre;
    this.primerApellido = primerApellido;
    this.segundoApellido = segundoApellido;
    this.sede = sede;
    this.fotografia = fotografia;
    this.rol = rol;
  }

  /**
   * This method is used to obtain the full name of the user
   * @returns The full name of the user
   **/
  obtenerNombreCompleto(): string {
    return `${this.nombre} ${this.primerApellido} ${this.segundoApellido}`;
  }
}
