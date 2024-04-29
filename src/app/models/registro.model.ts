import { Usuario } from './usuario.model';

export class Registro {
  id: number;
  fecha: Date;
  usuario: Usuario;
  descripcion: string;

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
