import { TipoActividad } from './tipo-actividad.model';
import { EstadoActividad } from './estado-actividad.model';
import { ModalidadActividad } from './modalidad-actividad.model';
import { Evidencia } from './evidencia.model';
import { Usuario } from './usuario.model';

// Actividad model class
// This class is used to represent an activity in the system
export class Actividad {
  id: string;
  nombre: string;
  descripcion: string;
  poster: File | null;
  fecha: Date;
  semana: number;
  responsable: Usuario;
  tipo: TipoActividad;
  estado: EstadoActividad;
  diasPreviosAnunciar: number;
  diasRequeridosRecordatorio: number;
  modalidad: ModalidadActividad;
  lugarEnlace: string;
  comentarios: string[];
  evidencias: Evidencia[];

  /**
   * Constructor
   * @param id The ID of the activity
   * @param nombre The name of the activity
   * @param descripcion The description of the activity
   * @param fecha The date of the activity
   * @param semana The week of the activity
   * @param responsables The responsible professors of the activity
   * @param tipo The type of the activity
   * @param estado The state of the activity
   * @param diasPreviosAnunciar The days before announcing the activity
   * @param diasRequeridosRecordatorio The days required for a reminder of the activity
   * @param modalidad The modality of the activity
   * @param lugarEnlace The link of the activity
   * @param comentarios The comments of the activity
   * @param evidencias The evidences of the activity
   **/
  constructor(
    id: string,
    nombre: string,
    descripcion: string,
    poster: File | null,
    fecha: Date,
    semana: number,
    responsables: Usuario,
    tipo: TipoActividad,
    estado: EstadoActividad,
    diasPreviosAnunciar: number,
    diasRequeridosRecordatorio: number,
    modalidad: ModalidadActividad,
    lugarEnlace: string,
    comentarios: string[],
    evidencias: Evidencia[]
  ) {
    this.id = id;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.poster = poster;
    this.fecha = fecha;
    this.semana = semana;
    this.responsable = responsables;
    this.tipo = tipo;
    this.estado = estado;
    this.diasPreviosAnunciar = diasPreviosAnunciar;
    this.diasRequeridosRecordatorio = diasRequeridosRecordatorio;
    this.modalidad = modalidad;
    this.lugarEnlace = lugarEnlace;
    this.comentarios = comentarios;
    this.evidencias = evidencias;
  }
}
