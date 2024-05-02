import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  standalone: true,
  selector: 'app-estudiantes',
  templateUrl: './estudiantes.component.html',
  styleUrl: './estudiantes.component.css',
  imports: [NavbarComponent],
})
export class EstudiantesComponent {
  constructor() { }

  ngOnInit() {

  }
}
