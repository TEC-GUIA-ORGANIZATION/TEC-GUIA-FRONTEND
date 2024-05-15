import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { Actividad } from '../../models/actividad.model';
import { ActivatedRoute } from '@angular/router';
import { GestorActividades } from '../../services/gestor-actividades.service';
import { GestorAutenticacion } from '../../services/gestor-autenticacion.service';

@Component({
  standalone: true,
  selector: 'app-actividad',
  templateUrl: './actividad.component.html',
  styleUrls: ['./actividad.component.css'],
  imports: [
    NavbarComponent
  ]
})
export class ActividadComponent {
  actividad: Actividad | null = null;

  constructor(private gestorActividadesService: GestorActividades, private route: ActivatedRoute, private gestorAutenticacion: GestorAutenticacion) {
    // Load the activity data
    var actividadId = this.route.snapshot.params['id'];

    this.gestorActividadesService.getActividad(actividadId).subscribe((actividad: Actividad | null) => {
      if (actividad === null) {
        return;
      }
      this.actividad = actividad;
    });
  }
}
