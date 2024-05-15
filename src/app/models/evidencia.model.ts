// Evidencia model class
// This class is used to represent an evidence in the system
export class Evidencia {
  id: string;
  asistencia: string[];
  participantes: string[];
  linkGrabacion: string;

  /**
   * Constructor
   * @param id The ID of the evidence
   * @param asistencia The attendance of the evidence
   * @param participantes The participants of the evidence
   * @param linkGrabacion The recording link of the evidence
   **/
  constructor(
    id: string,
    asistencia: string[],
    participantes: string[],
    linkGrabacion: string
  ) {
    this.id = id;
    this.asistencia = asistencia;
    this.participantes = participantes;
    this.linkGrabacion = linkGrabacion;
  }
}
