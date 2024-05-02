import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  standalone: true,
  selector: 'app-equipo',
  templateUrl: './equipo.component.html',
  styleUrl: './equipo.component.css',
  imports: [NavbarComponent],
})
export class EquipoComponent {
  constructor() { }

  ngOnInit() {

  }
}
