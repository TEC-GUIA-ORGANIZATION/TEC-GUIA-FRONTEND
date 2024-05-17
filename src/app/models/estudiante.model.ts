import { Sede } from './sede.model';

// Clase Estudiante
export class Estudiante {
    id: number;
    correo: string;
    nombre: string;
    primerApellido: string;
    segundoApellido: string;
    telefono: string;
    sede: Sede;
    institutionID: number;
    personalPhone: string;
    semester: string;
    entryYear: number;
    foto: string; // Agregado el atributo foto

    constructor(
        id: number,
        correo: string,
        nombre: string,
        primerApellido: string,
        segundoApellido: string,
        telefono: string,
        sede: Sede,
        institutionID: number,
        personalPhone: string,
        semester: string,
        entryYear: number,
        foto: string // Agregado el parámetro foto al constructor
    ) {
        this.id = id;
        this.correo = correo;
        this.nombre = nombre;
        this.primerApellido = primerApellido;
        this.segundoApellido = segundoApellido;
        this.telefono = telefono;
        this.sede = sede;
        this.institutionID = institutionID;
        this.personalPhone = personalPhone;
        this.semester = semester;
        this.entryYear = entryYear;
        this.foto = foto; // Asignación del parámetro foto al atributo de la clase
    }

    getNombreCompleto(): string {
        return `${this.nombre} ${this.primerApellido} ${this.segundoApellido}`;
    }
}
