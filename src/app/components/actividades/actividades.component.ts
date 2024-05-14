import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { MaterialModule } from '../../material/material.module';
import { GestorActividades } from '../../services/gestor-actividades.service';

@Component({
  standalone: true,
  selector: 'app-actividades',
  templateUrl: './actividades.component.html',
  styleUrl: './actividades.component.css',
  imports: [NavbarComponent, MaterialModule]
})
export class ActividadesComponent {
  constructor(private gestor:GestorActividades) { 

    this.getActividades()
  }
  actividades:any[] = [];
  getActividades(){
    this.gestor.getActividades().subscribe(actividades => {
      this.actividades = actividades;
    });
  }
}