import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { ProfesorGuia } from '../../models/profesor-guia.model';
import { Sede } from '../../models/sede.model';
import { GestorAutenticacion } from '../../services/gestor-autenticacion.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { GestorProfesoresGuia } from '../../services/gestor-profesores-guia.service';
import { GestorBlobStorage } from '../../services/gestor-blob-storage.service';

@Component({
  standalone: true,
  selector: 'app-equipo',
  templateUrl: './equipo.component.html',
  styleUrl: './equipo.component.css',
  imports: [
    CommonModule,
    NavbarComponent,
    NgxPaginationModule,
    FormsModule
  ]
})
export class EquipoComponent {
  @ViewChild('nombreInput', { static: false }) nombreInput!: ElementRef;
  @ViewChild('primerApellidoInput', { static: false }) primerApellidoInput!: ElementRef;
  @ViewChild('segundoApellidoInput', { static: false }) segundoApellidoInput!: ElementRef;
  @ViewChild('correoInput', { static: false }) correoInput!: ElementRef;
  @ViewChild('telefonoOficinaInput', { static: false }) telefonoOficinaInput!: ElementRef;
  @ViewChild('telefonoPersonalInput', { static: false }) telefonoPersonalInput!: ElementRef;
  @ViewChild('fotoInput', { static: false }) fotoInput!: ElementRef;
  @ViewChild('isCoordinadorInput', { static: false }) isCoordinadorInput!: ElementRef;

  @ViewChild('nombreCreationInput', { static: false }) nombreCreationInput!: ElementRef;
  @ViewChild('primerApellidoCreationInput', { static: false }) primerApellidoCreationInput!: ElementRef;
  @ViewChild('segundoApellidoCreationInput', { static: false }) segundoApellidoCreationInput!: ElementRef;
  @ViewChild('correoCreationInput', { static: false }) correoCreationInput!: ElementRef;
  @ViewChild('telefonoOficinaCreationInput', { static: false }) telefonoOficinaCreationInput!: ElementRef;
  @ViewChild('telefonoPersonalCreationInput', { static: false }) telefonoPersonalCreationInput!: ElementRef;
  @ViewChild('fotoCreationInput', { static: false }) fotoCreationInput!: ElementRef;
  @ViewChild('contraseniaCreationInput', { static: false }) contraseniaCreationInput!: ElementRef;

  
  pageSize: number = 5; // Number of items per page
  p: number = 1; // Current page, initialized to 1
  sedes: string[] = Object.values(Sede); // To store the list of sedes
  selectedSede: string = ''; // To store selected sede filter value
  selectedCoordinador: string = ''; // To store selected coordinador filter value
  profesorSeleccionado: ProfesorGuia | null = null;
  editMode: boolean = false;
  creatingMode: boolean = false;
  nuevoProfesor!:ProfesorGuia;
  originalProfesores: ProfesorGuia[] = []; // To store the original list of profesores
  profesores: ProfesorGuia[] = [];
  constructor(
    private gestorAutenticacion: GestorAutenticacion,
    private gestorProfesoresGuia: GestorProfesoresGuia,
    private gestorBlob: GestorBlobStorage
  ) {
    this.gestorProfesoresGuia.getProfesoresGuia().subscribe((profesores) => {
      /*
      esto solo si los asistentes pueden ver solo su propio campus
      if (this.isAdmin()&&this.gestorAutenticacion.getCurrentUser()?.campus !== 'Cartago'{
        this.profesores = profesores.filter(profesor => profesor.sede === this.gestorAutenticacion.getCurrentUser()?.sede);
      }
      else{*/
        this.profesores = profesores;
      
      
      this.originalProfesores = [...profesores];
    });
  }
  guardarProfesor() {
    if (!this.profesorSeleccionado) {
      console.log("Este profesor es nulo, no se puede editar");
      return;
    }
    else{
      if(this.profesorSeleccionado.sede==this.gestorAutenticacion.getCurrentUser()?.sede){
        if (this.nombreInput) this.profesorSeleccionado.nombre = this.nombreInput.nativeElement.value;
        if (this.primerApellidoInput) this.profesorSeleccionado.primerApellido = this.primerApellidoInput.nativeElement.value;
        if (this.segundoApellidoInput) this.profesorSeleccionado.segundoApellido = this.segundoApellidoInput.nativeElement.value;
        if (this.correoInput) this.profesorSeleccionado.correo = this.correoInput.nativeElement.value;
        if (this.telefonoOficinaInput) this.profesorSeleccionado.telefonoOficina = this.telefonoOficinaInput.nativeElement.value;
        if (this.telefonoPersonalInput) this.profesorSeleccionado.telefonoPersonal = this.telefonoPersonalInput.nativeElement.value;
            
        if (this.fotoInput &&this.fotoInput.nativeElement.files.length > 0) {
          const file = this.fotoInput.nativeElement.files[0];
          if(this.profesorSeleccionado.fotografia!=""){
            this.gestorBlob.deleteFile("users", this.profesorSeleccionado.id);
          }
          
          this.gestorBlob.uploadFile("users", this.profesorSeleccionado.id, file).then();
          this.profesorSeleccionado.fotografia="https://tecguia.blob.core.windows.net/users/"+this.profesorSeleccionado.id;
        }
        this.gestorProfesoresGuia.updateProfesor(this.profesorSeleccionado).subscribe(
          response => {
            console.log("Profesor actualizado exitosamente.", response);
          },
          error => {
            console.error("Error al actualizar el profesor:", error);
          }
        );
      }
      if(this.hasMainPrivileges()){
      this.gestorProfesoresGuia.setCoordinador(this.profesorSeleccionado.id, this.profesorSeleccionado.sede).subscribe(
          (respuesta) => {
            // Maneja la respuesta aquí, por ejemplo, muestra un mensaje de éxito o realiza otras acciones necesarias.
            console.log('La operación se realizó con éxito:', respuesta);
          },
          (error) => {
            // Maneja los errores aquí, por ejemplo, muestra un mensaje de error o realiza otras acciones necesarias.
            console.error('Ocurrió un error al realizar la operación:', error);
          }
        );
      }
      this.profesorSeleccionado.changeEditMode(!this.profesorSeleccionado.editable);
      this.profesorSeleccionado=null;
    }
  }
  getFileUrl(containerName: string, fileName: string){
    return this.gestorBlob.getFileUrl(containerName, fileName);
  }

  crearProfesor() {
    const sede=this.gestorAutenticacion.getCurrentUser()?.sede
    if(sede){
      const nuevoProfesor = new ProfesorGuia(
        '', // id (vacío ya que será generado por la base de datos)
        this.correoCreationInput.nativeElement.value,
        this.contraseniaCreationInput.nativeElement.value,
        this.nombreCreationInput.nativeElement.value,
        this.primerApellidoCreationInput.nativeElement.value,
        this.segundoApellidoCreationInput.nativeElement.value,
        sede, // Convertir el valor de sede a un miembro de la enumeración Sede
        "",
        'profesor guia',
        "",
        this.telefonoOficinaCreationInput.nativeElement.value,
        this.telefonoPersonalCreationInput.nativeElement.value,
        false, // Es coordinador (a configurar según corresponda)
        true // Está activo (a configurar según corresponda)
      );
      this.gestorProfesoresGuia.createProfessor(nuevoProfesor).subscribe((response)=>{
        console.log(response);
      });
    }
    this.creatingMode=false;
  }    

  isAdmin(){
    return this.gestorAutenticacion.getCurrentUserRol() === 'admin';
  }

  isProfe(){
    return this.gestorAutenticacion.getCurrentUserRol() === 'profesor guia';
  }

  isCoordinador(){
    return this.gestorAutenticacion.getCurrentUserRol() === 'coordinador';
  }

  isEstudiante(){
    return this.gestorAutenticacion.getCurrentUserRol() === 'estudiante';
  }
  filterProfesores() {
    // Filter profesores based on selectedSede and selectedCoordinador
    this.profesores = this.originalProfesores.filter(profesor => {
      let sedeFilter = !this.selectedSede || profesor.sede === this.selectedSede;
      let coordinadorFilter = !this.selectedCoordinador || profesor.rol.includes(this.selectedCoordinador);
      return sedeFilter && coordinadorFilter;
    });
  }

  // Add this method to handle changes in the selectedSede and selectedCoordinador filters
  onFilterChange() {
    this.filterProfesores(); // Call the filterProfesores function to update the list
  }

  seleccionarProfesor(profesor: ProfesorGuia): void {
    this.profesorSeleccionado = profesor;
  }

  hasPrivileges(): boolean {
    var user = this.gestorAutenticacion.getCurrentUser();

    if (user !== null) {
      if (user.rol === 'admin') {
        return true;
      }
    }

    return false;
  }

  hasMainPrivileges(): boolean {
    var user = this.gestorAutenticacion.getCurrentUser();

    if (user !== null) {
      if (user.rol === 'admin' && user.sede === Sede.CARTAGO) {
        return true;
      }
    }

    return false;
  }

  isCurrentUser(profesor: ProfesorGuia): boolean {
    var user = this.gestorAutenticacion.getCurrentUser();

    if (user !== null) {
      if (user.id === profesor.id) {
        return true;
      }
    }

    return false;
  }

  isCurrentUserSameCampus(profesor: ProfesorGuia): boolean {
    var user = this.gestorAutenticacion.getCurrentUser();

    if (user !== null) {
      if (user.sede === profesor.sede) {
        return true;
      }
    }

    return false;
  }

  changeEditMode(mode: boolean): void {
    this.editMode = mode;
  }
  changeCreatingMode(mode: boolean): void {
    this.profesorSeleccionado=null;
    this.creatingMode = mode;
  }
  darDeBaja(profesor: ProfesorGuia): void {
    this.gestorProfesoresGuia.changeState(profesor.id).subscribe(() => {
      this.profesores = this.profesores.filter(p => p.id !== profesor.id);
      this.originalProfesores = this.originalProfesores.filter(p => p.id !== profesor.id);
      this.profesorSeleccionado = null;
    });
  }
}
