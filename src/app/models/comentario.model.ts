import { Usuario } from './usuario.model';

// Comentario model class
// This class is used to represent a comment in the system
export class Comentario {
  id: number;
  fechaHora: Date;
  autor: Usuario;
  contenido: string;
  respuestas: Comentario[];

  /**
   * Constructor
   * @param id The ID of the comment
   * @param fechaHora The date and time of the comment
   * @param autor The author of the comment
   * @param contenido The content of the comment
   * @param respuestas The responses to the comment
   **/
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
