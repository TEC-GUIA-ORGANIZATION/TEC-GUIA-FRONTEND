import { Component, TemplateRef } from '@angular/core';
import { CalendarEvent, CalendarModule, CalendarView } from 'angular-calendar';
import { subDays, addDays, startOfDay, subMonths, addMonths, isSameDay } from 'date-fns';
import { NavbarComponent } from '../navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

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
export class CalendarComponent {
  view: CalendarView = CalendarView.Month;
  viewDate: Date = new Date();
  selectedDayViewDate: Date = new Date(); // Fecha del día seleccionado
  activeDayIsOpen: boolean = false; // Controla si el día está abierto

  events: CalendarEvent[] = [
    {
      id: 1,
      start: subDays(startOfDay(new Date()), 1),
      end: addDays(new Date(), 1),
      title: 'Evento de 3 días',
      color: { primary: '#e3bc08', secondary: '#FDF1BA' }
    },
    {
      id: 2,
      start: startOfDay(new Date()),
      title: 'Evento sin fecha de fin',
      color: { primary: '#1e90ff', secondary: '#D1E8FF' }
    },
    {
      id: 3,
      start: addDays(new Date(), 1),
      end: addDays(new Date(), 1),
      title: 'Evento de un día',
      color: { primary: '#ad2121', secondary: '#FAE3E3' }
    }
  ];

  CalendarView = CalendarView;

  constructor(private modalService: NgbModal) {} // Inyecta el servicio NgbModal

  // Función para cambiar al mes anterior
  previousMonth(): void {
    this.viewDate = subMonths(this.viewDate, 1);
  }

  // Función para cambiar al mes siguiente
  nextMonth(): void {
    this.viewDate = addMonths(this.viewDate, 1);
  }

  // Función para manejar el clic en un evento
  handleEvent(action: string, event: CalendarEvent): void {
    alert(`Evento ID: ${event.id}`);
    // Aquí puedes implementar la lógica para redirigir o mostrar los detalles del evento.
  }

  // Función para abrir el modal con las actividades de un día
  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }, content: TemplateRef<any>): void {
    if (isSameDay(this.viewDate, date) && this.activeDayIsOpen) {
      this.activeDayIsOpen = false;
    } else {
      this.selectedDayViewDate = date;
      this.activeDayIsOpen = true;
      this.modalService.open(content, { size: 'lg' }); // Abre el modal
    }
  }
}
