import { Usuario } from './usuario.model';

export class Comentario {
  id: number;
  fechaHora: Date;
  autor: Usuario;
  contenido: string;
  respuestas: Comentario[];

  constructor(
    id: number,
    fechaHora: Date,
    autor: Usuario,
    contenido: string,
    respuestas: Comentario[]
  ) {
    this.id = id;
    this.fechaHora = fechaHora;
    this.autor = autor;
    this.contenido = contenido;
    this.respuestas = respuestas;
  }
}
