import { Component } from '@angular/core';
import { faSearch, faBell, faUser } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  selectedTab: string = 'inicio'; // Inicio es el tab seleccionado por defecto

  selectTab(tab: string): void {
    this.selectedTab = tab;
  }

  // Función para verificar si un botón está activo
  isTabActive(tab: string): boolean {
    return this.selectedTab === tab;
  }
}