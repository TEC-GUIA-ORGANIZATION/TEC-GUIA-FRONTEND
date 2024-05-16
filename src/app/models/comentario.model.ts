// Comentario model class
// This class is used to represent a comment in the system
export class Comentario {
  fechaHora: Date;
  autor: string;
  contenido: string;

  /**
   * Constructor
   * @param id The ID of the comment
   * @param fechaHora The date and time of the comment
   * @param autor The author of the comment
   * @param contenido The content of the comment
   * @param respuestas The responses to the comment
   **/
  constructor(
    fechaHora: Date,
    autor: string,
    contenido: string,
  ) {
    this.fechaHora = fechaHora;
    this.autor = autor;
    this.contenido = contenido;
  }
}
