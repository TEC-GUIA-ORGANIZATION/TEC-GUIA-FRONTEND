import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { GestorAutenticacion } from '../../services/gestor-autenticacion.service';

@Component({
  standalone: true,
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  imports: [
    RouterLink,
    RouterLinkActive
  ],
})

export class NavbarComponent implements OnInit {
  constructor(private router: Router, public gestorAutenticacion: GestorAutenticacion) { }

  ngOnInit(): void {
  }

  isSelected(url: string): boolean {
    return this.router.isActive(url, true);
  }

  logout() {
    this.gestorAutenticacion.logout();
  }
}
