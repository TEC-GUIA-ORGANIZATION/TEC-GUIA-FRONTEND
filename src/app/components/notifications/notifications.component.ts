import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { Notificacion } from '../../models/notificacion.model';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css'],
  imports: [
    NavbarComponent,
    CommonModule,
  ],
})
export class NotificationsComponent {
  allNotifications: Notificacion[] = [];
  filteredNotifications: Notificacion[] = [];
  paginatedNotifications: Notificacion[] = [];
  notificationsPerPage: number = 2;
  currentPage: number = 1;
  totalPages: number[] = [];
  totalPageCount: number = 0;

  constructor() {}

  ngOnInit(): void {
    // Simula la carga de notificaciones
    this.loadNotifications();
    this.filterNotifications('all');
  }

  // XXX: Eliminar este texto y cargar notificaciones desde el servidor
  text: string = `Recordatorio de actividad: [Nombre de actividad]

Se le recuerda la realización próxima de la actividad [Nombre de la actividad] dentro de [cantidad de días faltantes] días.

A continuación se le presenta el resumen de su información:

Fecha de realización: [fecha]
Hora: [hora]
Modalidad: [Modalidad]
Lugar: [lugarEnlace].

Agradecemos su participación.
`

  loadNotifications(): void {
    // TODO: Cargar notificaciones desde el servidor
    this.allNotifications = [
      new Notificacion('1', "Hola", new Date("2021-09-01"), 'Actividad 1', true),
      new Notificacion('2', this.text, new Date(), 'Actividad 2', false),
      new Notificacion('3', this.text, new Date(), 'Actividad 3', true),
      new Notificacion('4', this.text, new Date(), 'Actividad 4', false),
      new Notificacion('5', this.text, new Date(), 'Actividad 5', true),
      new Notificacion('6', this.text, new Date(), 'Actividad 6', false),
      new Notificacion('7', this.text, new Date(), 'Actividad 7', true),
      new Notificacion('8', this.text, new Date(), 'Actividad 8', false),
      new Notificacion('9', this.text, new Date(), 'Actividad 9', false),
      new Notificacion('10', this.text, new Date(), 'Actividad 10', false),
      new Notificacion('11', this.text, new Date(), 'Actividad 11', false),
      new Notificacion('12', this.text, new Date(), 'Actividad 12', false),
    ];

    this.sortNotifications('desc');
    this.calculateTotalPages();
  }

  filterNotifications(filter: string): void {
    if (filter === 'all') {
      this.filteredNotifications = this.allNotifications;
    } else if (filter === 'unread') {
      this.filteredNotifications = this.allNotifications.filter(n => !n.leida);
    } else if (filter === 'read') {
      this.filteredNotifications = this.allNotifications.filter(n => n.leida);
    }
    this.currentPage = 1;
    this.calculateTotalPages();
    this.paginateNotifications();
  }

  sortNotifications(order: string): void {
    if (order === 'asc') {
      this.allNotifications = this.allNotifications.sort((a, b) => a.fecha.getTime() - b.fecha.getTime());
    } else if (order === 'desc') {
      this.allNotifications = this.allNotifications.sort((a, b) => b.fecha.getTime() - a.fecha.getTime());
    }
    this.filterNotifications('all');
  }

  calculateTotalPages(): void {
    this.totalPageCount = Math.ceil(this.filteredNotifications.length / this.notificationsPerPage);
    this.totalPages = Array.from({ length: this.totalPageCount }, (_, i) => i + 1);
  }

  paginateNotifications(): void {
    const start = (this.currentPage - 1) * this.notificationsPerPage;
    const end = start + this.notificationsPerPage;
    this.paginatedNotifications = this.filteredNotifications.slice(start, end);
  }

  goToPage(page: number): void {
    this.currentPage = page;
    this.paginateNotifications();
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.paginateNotifications();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPageCount) {
      this.currentPage++;
      this.paginateNotifications();
    }
  }

  markAsRead(id: string): void {
    const notification = this.allNotifications.find(n => n.id === id);
    if (notification) {
      notification.leida = true;
    }
  }

  markAllAsRead(): void {
    this.allNotifications.forEach(n => n.leida = true);
    this.filterNotifications('all');
  }

  markAsUnread(id: string): void {
    const notification = this.allNotifications.find(n => n.id === id);
    if (notification) {
      notification.leida = false;
    }
  }

  deleteNotification(id: string): void {
    this.allNotifications = this.allNotifications.filter(n => n.id !== id);
  }

  deleteReadNotifications(): void {
    this.allNotifications = this.allNotifications.filter(n => !n.leida);
    this.filterNotifications('all');
  }
}
