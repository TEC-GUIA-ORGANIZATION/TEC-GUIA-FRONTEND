import { Usuario } from './usuario.model';
import { Sede } from './sede.model';

export class AsistenteAdministrativo extends Usuario {
  esPrincipal: boolean;

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
