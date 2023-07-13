import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
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
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { AuthService } from 'src/app/modules/auth/shared/services/auth.service';
import { CommonService } from 'src/app/shared/services/common.service';
import { ProxyService } from 'src/app/shared/services/proxy.service';
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
    InputNumberModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [EventService, ProxyService, AuthService, CommonService],
})
export class CalendarAppComponent implements OnInit {
  events: any[] = [];

  clients!: Client[];
  chosenClient: FormControl = new FormControl('');

  sessions: any[] = [];
  sessionForm!: FormGroup;

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
    private formBuilder: FormBuilder,
    private readonly proxyService: ProxyService,
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.today = new Date().toISOString().split('T')[0];
    this.getTrainerClients();
    this.createSessionForm();

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

  addNewClient() {
    this.router.navigate(['/trainer-profile/add-client']);
  }

  getTrainerClients() {
    this.proxyService
      .GetClientsByTrainerId({
        TRAINER_ID: this.authService.getUserId(),
      })
      .subscribe((res: any) => {
        this.clients = res.Trainer_Clients.map((client: any) => ({
          fullName: client.First_Name + ' ' + client.Last_Name,
          user_id: client.User_Id,
        }));
        console.log(this.clients);
      });
  }

  createSessionForm() {
    this.sessionForm = this.formBuilder.group({
      sessions_bundle_session_id: [-1],
      sessions_bundle_id: [null],
      start_date_time1: [null, Validators.required],
      end_date_time: [null, Validators.required],
      description: [null],
      chosenClient: [null],
      location: [null],
    });

    this.chosenClient.valueChanges.subscribe((value) => {
      this.proxyService
        .Get_Sessions_bundle_By_CLIENT_ID({ CLIENT_ID: value })
        .subscribe((res: any) => {
          this.sessions = res;
          console.log(this.sessions);
        });
    });
  }

  submitEvent() {
    const event = {
      sessions_bundle_session_id:
        this.sessionForm.value.sessions_bundle_session_id,
      sessions_bundle_id: this.sessionForm.value.sessions_bundle_id,
      start_date_time1: this.sessionForm.value.start_date_time1,
      end_date_time: this.sessionForm.value.end_date_time,
      description:
        'Location: ' +
        this.sessionForm.value.location +
        this.sessionForm.value.description,
    };
    this.proxyService
      .Edit_Sessions_bundle_session(event)
      .subscribe((res: any) => {});
  }
}
