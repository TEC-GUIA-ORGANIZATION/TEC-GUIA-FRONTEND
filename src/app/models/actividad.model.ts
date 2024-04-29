import { ProfesorGuia } from './profesor-guia.model';
import { TipoActividad } from './tipo-actividad.model';
import { EstadoActividad } from './estado-actividad.model';
import { ModalidadActividad } from './modalidad-actividad.model';
import { Comentario } from './comentario.model';

export class Actividad {
  id: number;
  nombre: string;
  descripcion: string;
  fecha: Date;
  semana: number;
  responsables: ProfesorGuia[];
  tipo: TipoActividad;
  estado: EstadoActividad;
  diasPreviosAnunciar: number;
  diasRequeridosRecordatorio: number;
  modalidad: ModalidadActividad;
  lugarEnlace: string;
  comentarios: Comentario[];

  constructor(
    id: number,
    nombre: string,
    descripcion: string,
    fecha: Date,
    semana: number,
    responsables: ProfesorGuia[],
    tipo: TipoActividad,
    estado: EstadoActividad,
    diasPreviosAnunciar: number,
    diasRequeridosRecordatorio: number,
    modalidad: ModalidadActividad,
    lugarEnlace: string,
    comentarios: Comentario[]
  ) {
    this.id = id;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.fecha = fecha;
    this.semana = semana;
    this.responsables = responsables;
    this.tipo = tipo;
    this.estado = estado;
    this.diasPreviosAnunciar = diasPreviosAnunciar;
    this.diasRequeridosRecordatorio = diasRequeridosRecordatorio;
    this.modalidad = modalidad;
    this.lugarEnlace = lugarEnlace;
    this.comentarios = comentarios;
  }
}
