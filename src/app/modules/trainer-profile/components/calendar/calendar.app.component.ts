import { Component, OnInit } from '@angular/core';
// @fullcalendar plugins
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { Client } from '../../shared/models/client.model';
import { EventService } from '../../shared/services/event.service';
@Component({
  templateUrl: './calendar.app.component.html',
  styleUrls: ['./calendar.app.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    FullCalendarModule,
    DialogModule,
    InputTextareaModule,
    ButtonModule,
    CalendarModule,
    InputTextModule,
    DropdownModule,
    ToastModule,
    RippleModule,
    OverlayPanelModule,
    InputNumberModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [EventService],
})
export class CalendarAppComponent implements OnInit {
  events: any[] = [];

  clients: Client[] = [
    { firstName: 'Client', lastName: '1', id: 1, phoneNumber: '1234567890' },
    { firstName: 'Client', lastName: '2', id: 2, phoneNumber: '1234567890' },
    { firstName: 'Client', lastName: '3', id: 3, phoneNumber: '1234567890' },
    { firstName: 'Client', lastName: '4', id: 4, phoneNumber: '1234567890' },
  ].map((client) => ({
    ...client,
    fullName: `${client.firstName} ${client.lastName}`,
  }));

  clientForm!: FormGroup;

  today: string = '';

  calendarOptions: any = {
    initialView: 'timeGridDay',
  };

  showDialog: boolean = false;

  clickedEvent: any = null;

  dateClicked: boolean = false;

  edit: boolean = false;

  tags: any[] = [];

  view: string = '';

  changedEvent: any;

  constructor(
    private eventService: EventService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.today = new Date().toISOString().split('T')[0];
    this.eventService.getEvents().then((events) => {
      this.events = events;
      this.calendarOptions = { ...this.calendarOptions, ...{ events: events } };
      this.tags = this.events.map((item) => item.tag);
    });

    this.calendarOptions = {
      plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
      height: 720,
      initialDate: this.today,
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay',
      },
      editable: true,
      selectable: true,
      selectMirror: true,
      dayMaxEvents: true,
      eventClick: (e: MouseEvent) => this.onEventClick(e),
      select: (e: MouseEvent) => this.onDateSelect(e),
    };

    this.createClientForm();
  }

  onEventClick(e: any) {
    this.clickedEvent = e.event;
    let plainEvent = e.event.toPlainObject({
      collapseExtendedProps: true,
      collapseColor: true,
    });
    this.view = 'display';
    this.showDialog = true;

    this.changedEvent = { ...plainEvent, ...this.clickedEvent };
    this.changedEvent.start = this.clickedEvent.start;
    this.changedEvent.end = this.clickedEvent.end
      ? this.clickedEvent.end
      : this.clickedEvent.start;
  }

  onDateSelect(e: any) {
    this.view = 'new';
    this.showDialog = true;
    this.changedEvent = {
      ...e,
      client: null,
      description: null,
      location: null,
      backgroundColor: null,
      borderColor: null,
      textColor: null,
      tag: { color: null, name: null },
    };
  }

  handleSave() {
    if (!this.validate()) {
      return;
    } else {
      this.showDialog = false;
      this.clickedEvent = {
        ...this.changedEvent,
        backgroundColor: this.changedEvent.tag.color,
        borderColor: this.changedEvent.tag.color,
        textColor: '#212121',
      };

      if (this.clickedEvent.hasOwnProperty('id')) {
        this.events = this.events.map((i) =>
          i.id.toString() === this.clickedEvent.id.toString()
            ? (i = this.clickedEvent)
            : i
        );
      } else {
        this.events = [
          ...this.events,
          { ...this.clickedEvent, id: Math.floor(Math.random() * 10000) },
        ];
      }
      this.calendarOptions = {
        ...this.calendarOptions,
        ...{ events: this.events },
      };
      this.clickedEvent = null;
    }
  }

  onEditClick() {
    this.view = 'edit';
  }

  delete() {
    this.events = this.events.filter(
      (i) => i.id.toString() !== this.clickedEvent.id.toString()
    );
    this.calendarOptions = {
      ...this.calendarOptions,
      ...{ events: this.events },
    };
    this.showDialog = false;
  }

  validate() {
    let { start, end } = this.changedEvent;
    return start && end;
  }

  createClientForm() {
    this.clientForm = this.formBuilder.group({
      id: '',
      firstName: '',
      lastName: '',
      fullName: '',
      phoneNumber: [null],
    });
  }

  addNewClient() {
    const newClient = {
      ...this.clientForm.value,
      fullName: `${this.clientForm.value.firstName} ${this.clientForm.value.lastName}`,
    };

    this.clients = [...this.clients, newClient];
    this.changedEvent.client = this.clients[this.clients.length - 1];

    this.clientForm.reset();
  }
}
