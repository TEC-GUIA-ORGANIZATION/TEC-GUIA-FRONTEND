import { Usuario } from './usuario.model';
import { Sede } from './sede.model';

// Asistente Administrativo model class
// This class is used to represent an administrative assistant in the system
export class AsistenteAdministrativo extends Usuario {
  esPrincipal: boolean;

  /**
   * Constructor
   * @param id The ID of the asistente administrativo
   * @param correo The email of the asistente administrativo
   * @param contrasena The password of the asistente administrativo
   * @param nombre The name of the asistente administrativo
   * @param primerApellido The first last name of the asistente administrativo
   * @param segundoApellido The second last name of the asistente administrativo
   * @param sede The sede of the asistente administrativo
   * @param fotografia The photo of the asistente administrativo
   * @param esPrincipal The main asistente administrativo
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
    esPrincipal: boolean
  ) {
    super(id, correo, contrasena, nombre, primerApellido, segundoApellido, sede, fotografia);
    this.esPrincipal = esPrincipal;
  }
}
