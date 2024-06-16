import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { Notificacion } from '../../models/notificacion.model';
import { CommonModule } from '@angular/common';
import { GestorNotificaciones } from '../../services/gestor-notificaciones.service';

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

  constructor(
    private gestorNotificaciones: GestorNotificaciones
  ) {
    this.gestorNotificaciones.obtenerNotificacionesUsuario().subscribe((notifications: Notificacion[]) => {
      console.log('Notificaciones cargadas:', notifications);
      this.allNotifications = notifications;
      this.sortNotifications('desc');
      this.calculateTotalPages();
    }, (error) => {
      console.error('Error al cargar las notificaciones:', error);
    });
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
    this.allNotifications.forEach((n) => {
      this.gestorNotificaciones.toggleReadStatus(n.id).subscribe(() => {
        n.leida = true
      }, (error) => {
        console.error('Error al marcar todas las notificaciones como leídas:', error);
      });
    });
    this.filterNotifications('all');
  }

  markAsUnread(id: string): void {
    const notification = this.allNotifications.find(n => n.id === id);
    if (notification) {
      this.gestorNotificaciones.toggleReadStatus(id).subscribe(() => {
        notification.leida = false;
      }, (error) => {
        console.error('Error al marcar la notificación como no leída:', error);
      });
    }
  }

  deleteNotification(id: string): void {
    this.gestorNotificaciones.eliminarNotificacion(id).subscribe(() => {
      this.allNotifications = this.allNotifications.filter(n => n.id !== id);
      this.filterNotifications('all');
    }, (error) => {
      console.error('Error al eliminar la notificación:', error);
    });
  }

  deleteReadNotifications(): void {
    const readNotifications = this.allNotifications.filter(n => n.leida);
    readNotifications.forEach((n) => {
      this.gestorNotificaciones.eliminarNotificacion(n.id).subscribe(() => {
        this.allNotifications = this.allNotifications.filter(notification => notification.id !== n.id);
        this.filterNotifications('all');
      }, (error) => {
        console.error('Error al eliminar la notificación:', error);
      });
    });
  }
}
