import { Usuario } from './usuario.model';
import { Sede } from './sede.model';

// This class is used to represent a guide teacher in the system
export class ProfesorGuia extends Usuario {
  codigo: string;
  telefonoOficina: string;
  telefonoPersonal: string;
  esCoordinador: boolean;
  estaActivo: boolean;

  /**
   * Constructor
   * @param id The ID of the guide teacher
   * @param correo The email of the guide teacher
   * @param contrasena The password of the guide teacher
   * @param nombre The name of the guide teacher
   * @param primerApellido The first last name of the guide teacher
   * @param segundoApellido The second last name of the guide teacher
   * @param sede The headquarters of the guide teacher
   * @param fotografia The photo of the guide teacher
   * @param rol The role of the user
   * @param codigo The code of the guide teacher
   * @param telefonoOficina The office phone number of the guide teacher
   * @param telefonoPersonal The personal phone number of the guide teacher
   * @param esCoordinador The coordinator status of the guide teacher
   * @param estaActivo The active status of the guide teacher
   **/
  constructor(
    id: string,
    correo: string,
    contrasena: string,
    nombre: string,
    primerApellido: string,
    segundoApellido: string,
    sede: Sede,
    fotografia: string,
    rol: string,
    codigo: string,
    telefonoOficina: string,
    telefonoPersonal: string,
    esCoordinador: boolean,
    estaActivo: boolean
  ) {
    super(id, correo, contrasena, nombre, primerApellido, segundoApellido, sede, fotografia, rol);
    this.codigo = codigo;
    this.telefonoOficina = telefonoOficina;
    this.telefonoPersonal = telefonoPersonal;
    this.esCoordinador = esCoordinador;
    this.estaActivo = estaActivo;
  }

  /**
   * This method returns the code of the guide teacher
   * @returns The code of the guide teacher
   **/
  obtenerCodigo(): string {
    switch (this.sede) {
      case Sede.CARTAGO:
        return "CA-" + this.codigo;
      case Sede.ALAJUELA:
        return "AL-" + this.codigo;
      case Sede.SAN_CARLOS:
        return "SC-" + this.codigo;
      case Sede.SAN_JOSE:
        return "SJ-" + this.codigo;
      case Sede.LIMON:
        return "LI-" + this.codigo;
    }
  }
}
