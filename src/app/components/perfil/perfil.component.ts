import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Estudiante } from '../../models/estudiante.model';
import { CommonModule } from '@angular/common';
import { GestorEstudiantes } from '../../services/gestor-estudiantes.service';
import { GestorAutenticacion } from '../../services/gestor-autenticacion.service';
import { GestorBlobStorage } from '../../services/gestor-blob-storage.service';
import { HttpClient } from '@angular/common/http';

@Component({
  standalone: true,
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
  imports: [
    CommonModule,
    NavbarComponent,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class PerfilComponent {
  profileForm: FormGroup;
  estudiante: Estudiante | null = null;
  photoUrl = "/assets/images/default-user.jpg";
  photo: File | null = null;
  isEditable = false;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private gestorEstudiantes: GestorEstudiantes,
    private gestorAutenticacion: GestorAutenticacion,
    private gestorBlobStorage: GestorBlobStorage
  ) {
    this.profileForm = this.fb.group({
      telefono: [this.estudiante?.telefono],
      personalPhone: [this.estudiante?.personalPhone],
    });

    this.gestorEstudiantes.getEstudiante(this.gestorAutenticacion.getCurrentUser()!.id).subscribe(estudiante => {
      this.estudiante = estudiante;
      let url = this.gestorBlobStorage.getFileUrl("users", this.estudiante!.id.toString());
      this.http.head(url, { observe: 'response' }).subscribe(() => {
        this.photoUrl = url;
      }, error => {
        console.error(error);
      });
    }, error => {
      console.error(error);
    });
  }

  toggleEdit() {
    this.isEditable = !this.isEditable;
  }

  onSubmit() {
    if (!this.estudiante) {
      return;
    }

    if (this.profileForm.invalid) {
      return;
    }

    if (this.photo) {
      this.gestorBlobStorage.uploadFile("users", this.estudiante?.id.toString(), this.photo).then(url => {
        this.photoUrl = url;
      });
    }

    // TODO: Actualizar datos del estudiante

    this.isEditable = false;
  }

  onFileSelected(event: any) {
    this.photo = event.target.files[0];
  }

  changePassword() {
    // TODO: Implementar
  }
}
