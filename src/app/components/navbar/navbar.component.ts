import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { GestorAutenticacion } from '../../services/gestor-autenticacion.service';

@Component({
  standalone: true,
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive
  ],
})

export class NavbarComponent {

  constructor(
    private router: Router,
    public gestorAutenticacion: GestorAutenticacion
  ) { }

  isSelected(url: string): boolean {
    return this.router.isActive(url, true);
  }

  logout() {
    this.gestorAutenticacion.logout();
  }

  isStudent(): boolean {
    return this.gestorAutenticacion.getCurrentUserRol() === 'estudiante';
  }
}
