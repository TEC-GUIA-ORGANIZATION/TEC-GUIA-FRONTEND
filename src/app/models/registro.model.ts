import { Usuario } from './usuario.model';

// This class is used to represent a record in the system
export class Registro {
  id: number;
  fecha: Date;
  usuario: Usuario;
  descripcion: string;

  /**
   * Constructor
   * @param id The ID of the record
   * @param fecha The date of the record
   * @param usuario The user that made the record
   * @param descripcion The description of the record
   **/
  constructor(
    id: number,
    fecha: Date,
    usuario: Usuario,
    descripcion: string
  ) {
    this.id = id;
    this.fecha = fecha;
    this.usuario = usuario;
    this.descripcion = descripcion;
  }
}
