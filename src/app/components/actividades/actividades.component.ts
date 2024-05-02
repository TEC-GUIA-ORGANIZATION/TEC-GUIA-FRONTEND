import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  standalone: true,
  selector: 'app-actividades',
  templateUrl: './actividades.component.html',
  styleUrl: './actividades.component.css',
  imports: [NavbarComponent],
})
export class ActividadesComponent {
  constructor() { }

  ngOnInit() {

  }
}
