
import { Component, OnInit, ViewChild } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MaterialModule } from '../../material/material.module';
@Component({
  standalone: true,
  selector: 'app-estudiantes',
  templateUrl: './estudiantes.component.html',
  styleUrl: './estudiantes.component.css',
  imports: [NavbarComponent,MaterialModule],
})
export class EstudiantesComponent implements OnInit {
  items: any[] = []; // Aquí podría tener los dato
  selectedItem: any = null; // Para almacenar el elemento seleccionado para edición

  constructor() { }

  ngOnInit(): void {
    // Aquí se puede inicializar el componente, por ejemplo, cargar datos
    this.loadItems();
  }

  loadItems() {
    // Simular datos de ejemplo
    this.items = [
      { id: 1, nombre: 'Juan', primerApellido: 'Perez', segundoApellido: 'Gomez', email: 'juan@example.com', numeroTelefono: '123456789', campus: 'Campus A' },
      { id: 2, nombre: 'María', primerApellido: 'López', segundoApellido: 'García', email: 'maria@example.com', numeroTelefono: '987654321', campus: 'Campus B' },
      { id: 3, nombre: 'Carlos', primerApellido: 'Rodriguez', segundoApellido: 'Fernandez', email: 'carlos@example.com', numeroTelefono: '456789123', campus: 'Campus C' },
      // Agrega más datos según sea necesario
    ];
  }
  toggleEdit(item: any) {
    if (item.editable) {
      // Guardar los cambios o realizar alguna otra acción necesaria
    }
    item.editable = !item.editable;
  }
}