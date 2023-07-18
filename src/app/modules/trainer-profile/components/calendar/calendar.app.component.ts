import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
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
  providers: [EventService, ProxyService],
})
export class CalendarAppComponent implements OnInit {
  events: any[] = [];

  clients!: Client[];
  chosenClient: any = null;

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

    this.proxyService
      .GetSessionsByTrainerId({
        TRAINER_ID: this.authService.getUserId(),
      })
      .subscribe(
        (response: any) => {
          console.log(response);
          this.events = response.Sessions.map((item: any) => {
            return {
              id: item.Sessions_Bundle_Session_Id,
              // title: 'wow', set the title as client name
              start: item.Start_Date_Time1,
              end: item.End_Date_Time,
              // tag: { color: '#D2D6FF', name: 'Company C' }, set a default color
              sessions_number: item.Sessions_Number,
              description: item.Description,
            };
          });

          this.calendarOptions = {
            ...this.calendarOptions,
            events: this.events,
          };

          this.tags = this.events.map((item) => item.tag);
        },
        (error) => {
          console.error(error);
        }
      );

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

  // handleSave() {
  //   if (!this.validate()) {
  //     return;
  //   } else {
  //     this.showDialog = false;
  //     this.clickedEvent = {
  //       ...this.changedEvent,
  //       backgroundColor: this.changedEvent.tag.color,
  //       borderColor: this.changedEvent.tag.color,
  //       textColor: '#212121',
  //     };

  //     if (this.clickedEvent.hasOwnProperty('id')) {
  //       this.events = this.events.map((i) =>
  //         i.id.toString() === this.clickedEvent.id.toString()
  //           ? (i = this.clickedEvent)
  //           : i
  //       );
  //     } else {
  //       this.events = [
  //         ...this.events,
  //         { ...this.clickedEvent, id: Math.floor(Math.random() * 10000) },
  //       ];
  //     }
  //     this.calendarOptions = {
  //       ...this.calendarOptions,
  //       ...{ events: this.events },
  //     };
  //     this.clickedEvent = null;
  //   }
  // }

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
      .GetBundlesAndClientsByTrainerId({
        TRAINER_ID: this.authService.getUserId(),
      })
      .subscribe((res: any) => {
        this.clients = res.Bundlesandclients.map((client: any) => ({
          fullName: client.Client_Firstname + ' ' + client.Client_Lastname,
          user_id: client.Client_Id,
          bundle_id: client.Sessions_Bundle_Id,
          sessionsLeft: client.Sessions_Number,
          description: client.Description,
        }));
        console.log(this.clients);
      });
  }

  createSessionForm() {
    this.sessionForm = this.formBuilder.group({
      sessions_bundle_session_id: [-1],
      done: [-1],
      sessions_bundle_id: [null],
      // start_date_time1: [null, Validators.required],
      // end_date_time: [null, Validators.required],
      description: ' ',
      location: ' ',
    });
  }

  submitEvent() {
    const event = {
      sessions_bundle_session_id:
        this.sessionForm.value.sessions_bundle_session_id,
      done: this.sessionForm.value.done,
      sessions_bundle_id: this.sessionForm.value.sessions_bundle_id,
      start_date_time1: this.changedEvent.start,
      end_date_time: this.changedEvent.end,
      description:
        'Location: ' +
        this.changedEvent.location +
        this.changedEvent.description,
    };
    this.proxyService
      .Edit_Sessions_bundle_session(event)
      .subscribe((res: any) => {});
  }

  onClientChange(event: any) {
    this.chosenClient = event.value;
    this.sessionForm.patchValue({
      sessions_bundle_id: this.chosenClient.bundle_id,
      description: this.chosenClient.description,
    });
  }
}
