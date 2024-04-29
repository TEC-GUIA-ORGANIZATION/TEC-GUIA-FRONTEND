import { Usuario } from './usuario.model';
import { Sede } from './sede.model';

export class ProfesorGuia extends Usuario {
  codigo: string;
  telefonoOficina: string;
  telefonoPersonal: string;
  esCoordinador: boolean;
  estaActivo: boolean;

  constructor(
    id: number,
    correo: string,
    contrasena: string,
    nombre: string,
    primerApellido: string,
    segundoApellido: string,
    sede: Sede,
    fotografia: string,
    codigo: string,
    telefonoOficina: string,
    telefonoPersonal: string,
    esCoordinador: boolean,
    estaActivo: boolean
  ) {
    super(id, correo, contrasena, nombre, primerApellido, segundoApellido, sede, fotografia);
    this.codigo = codigo;
    this.telefonoOficina = telefonoOficina;
    this.telefonoPersonal = telefonoPersonal;
    this.esCoordinador = esCoordinador;
    this.estaActivo = estaActivo;
  }

  obtenerCodigo(): string {
    switch (this.sede) {
      case Sede.CARTAGO:
        return "CA" + this.codigo;
      case Sede.ALAJUELA:
        return "AL" + this.codigo;
      case Sede.SAN_CARLOS:
        return "SC" + this.codigo;
      case Sede.SAN_JOSE:
        return "SJ" + this.codigo;
      case Sede.LIMON:
        return "LI" + this.codigo;
    }
  }
}
