
import { Component, OnInit, ViewChild } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MaterialModule } from '../../material/material.module';
import { GestorEstudiantes } from '../../services/gestor-estudiantes.service';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-estudiantes',
  templateUrl: './estudiantes.component.html',
  styleUrl: './estudiantes.component.css',
  imports: [NavbarComponent,MaterialModule,FormsModule],
})

  export class EstudiantesComponent implements OnInit {
    estudiantes: any[] = [];
    selectedItem: any | null = null;
  
    // Listas de opciones para los combobox
    semesters: string[] = ['primer semestre', 'segundo semestre']; // Ajusta según tus necesidades
    entryYears: number[] = [2023, 2024, 2025]; // Ajusta según tus necesidades
    selectedSemester: string = this.semesters[0]; // Valor por defecto para el combobox de semester
    selectedEntryYear: number = this.entryYears[1]; // Valor por defecto para el combobox de entryYear
  
    constructor(private gestorEstudiantes: GestorEstudiantes) { }
  
    ngOnInit(): void {
      this.loadEstudiantes();
    }
  
    loadEstudiantes() {
      this.gestorEstudiantes.getEstudiantes({semester:this.selectedSemester,entryYear: this.selectedEntryYear}).subscribe(estudiantes => {
        this.estudiantes = estudiantes;
      });
    }
  
    toggleEdit(estudiante: any) {
      if (estudiante.editable) {
        this.gestorEstudiantes.updateEstudiante(estudiante).subscribe(updatedEstudiante => {
          // Puedes manejar la respuesta si es necesario
        });
      }
      estudiante.editable = !estudiante.editable;
    }
  }
  