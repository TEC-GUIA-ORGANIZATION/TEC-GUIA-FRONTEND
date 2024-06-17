import { Component, OnInit } from '@angular/core';
import { isSameDay, isSameMonth } from 'date-fns';
import { Subject } from 'rxjs';
import { CalendarEvent, CalendarModule, CalendarView } from 'angular-calendar';
import { EventColor } from 'calendar-utils';
import { NavbarComponent } from '../navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { GestorPlanTrabajo } from '../../services/gestor-planes-trabajo.service';
import { Router } from '@angular/router';

const colors: Record<string, EventColor> = {
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
};

@Component({
  standalone: true,
  selector: 'app-activity-calendar',
  templateUrl: './activity-calendar.component.html',
  styleUrls: ['./activity-calendar.component.css'],
  imports: [
    NavbarComponent,
    CalendarModule,
    CommonModule
  ],
})
export class CalendarComponent implements OnInit {
  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  refresh = new Subject<void>();

  events: CalendarEvent[] = [];

  activeDayIsOpen: boolean = true;

  constructor(
    private router: Router,
    private gestorPlanes: GestorPlanTrabajo
  ) { }

  ngOnInit() {
    this.gestorPlanes.getActividades().subscribe(actividades => {
      if (actividades === null) {
        return;
      }
      actividades.forEach(actividad => {
        // Verifica que la fecha sea un string compatible con Date
        const startDate = new Date(actividad.fecha);
        if (!isNaN(startDate.getTime())) { // Comprueba si la fecha es válida
          this.events.push({
            id: actividad.id,
            start: startDate,
            end: startDate, // Usamos la misma fecha de inicio y fin para eventos de un día
            title: actividad.nombre,
            color: colors['blue'],
          });
        } else {
          console.warn("Invalid date for event: " + actividad.nombre);
        }
      });

      // Notifica al calendario que se han añadido nuevos eventos
      this.refresh.next();
    });
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  handleEvent(event: CalendarEvent): void {
    // Redirige a la página de la actividad
    this.router.navigate(['/actividad/' + event.id]);
  }
  goToNextActivity() {
    const currentDate = new Date();
    let nextActivityId = null;

    // Sort events by start date
    const sortedEvents = this.events.sort((a, b) => a.start.getTime() - b.start.getTime());

    for (const actividad of sortedEvents) {
      if (actividad.start > currentDate) {
        nextActivityId = actividad.id;
        break;
      }
    }

    if (nextActivityId) {
      this.router.navigate(['/actividad/' + nextActivityId]);
    } else {
      console.log('No upcoming activities found');
    }
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  setView(view: CalendarView) {
    this.view = view;
  }
}
