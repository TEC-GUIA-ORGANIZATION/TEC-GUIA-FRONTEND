import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { GestorAutenticacion } from '../../services/gestor-autenticacion.service';
import { GestorNotificaciones } from '../../services/gestor-notificaciones.service';

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
  notificationsCount: number = 0;
  hasNotification: boolean = false;

  constructor(
    private router: Router,
    public gestorAutenticacion: GestorAutenticacion,
    public gestorNotificaciones: GestorNotificaciones
  ) {
    this.gestorNotificaciones.obtenerNumeroNotificacionesNoLeidas().subscribe((count: number) => {
      this.notificationsCount = count;
      this.hasNotification = count > 0;
    });
  }

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
