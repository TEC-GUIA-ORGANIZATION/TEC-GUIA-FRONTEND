import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { Comentario } from '../../models/comentario.model';
import { GestorComentarios } from '../../services/gestor-comentarios.service';
import { Actividad } from '../../models/actividad.model';
import { GestorActividades } from '../../services/gestor-actividades.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { GestorAutenticacion } from '../../services/gestor-autenticacion.service';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-comentarios',
  templateUrl: './comentarios.component.html',
  styleUrl: './comentarios.component.css',
  imports: [
    NavbarComponent,
    CommonModule,
    NgxPaginationModule,
    FormsModule
  ]
})
export class ComentariosComponent {
  actividadId: string = '';
  comentarios: Comentario[] = [];
  actividad: Actividad | null = null;
  comment: string = '';
  p: number = 1;
  order: string = 'asc';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private gestorComentarios: GestorComentarios,
    private gestorActividadesService: GestorActividades,
    private gestorAutenticacion: GestorAutenticacion
  ) {
    this.actividadId = this.route.snapshot.params['id'];

    this.gestorActividadesService.getActividad(this.actividadId).subscribe((actividad: Actividad | null) => {
      if (actividad === null) {
        return;
      }

      this.actividad = actividad;

      this.gestorComentarios.getComentariosActividad(this.actividadId).subscribe((comentarios: Comentario[] | null) => {
        if (comentarios === null) {
          console.log('Error getting comments');
          return;
        }

        this.comentarios.push(...comentarios);
      });
    });
  }

  postComment() {
    var user = this.gestorAutenticacion.getCurrentUser();
    if (user === null) {
      console.log('Error getting current user');
      return;
    }

    if (this.comment === '') {
      return;
    }

    if (this.actividad === null) {
      console.log('Error posting comment');
      return;
    }

    var comment = new Comentario(new Date(), user.obtenerNombreCompleto(), this.comment);

    this.gestorComentarios.addComentario(this.actividad.id, comment, user).subscribe((comentario: Comentario) => {
      if (comentario === null) {
        console.log('Error publishing comment');
        return;
      }

      if (this.order === 'asc') {
        this.comentarios.push(comment);
      } else {
        this.comentarios.unshift(comment);
      }
    });
  }

  goBack() {
    this.router.navigate(['/actividad/' + this.actividadId]);
  }

  getDate(date: Date | undefined): string {
    if (date === undefined) {
      return '';
    }

    return new Date(date).toLocaleDateString() + ' ' + new Date(date).toLocaleTimeString();
  }

  sortComments(order: string) {
    this.order = order;
    if (order === 'asc') {
      this.comentarios.sort((a, b) => {
        return new Date(a.fechaHora).getTime() - new Date(b.fechaHora).getTime();
      });
    } else if (order === 'desc') {
      this.comentarios.sort((a, b) => {
        return new Date(b.fechaHora).getTime() - new Date(a.fechaHora).getTime();
      });
    }
  }
}
