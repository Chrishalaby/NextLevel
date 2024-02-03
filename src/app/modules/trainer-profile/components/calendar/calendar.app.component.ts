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
import { AccessTokenService } from 'src/app/modules/auth/shared/services/access-token.service';
import { ClientsTrainersService } from 'src/app/shared/services/cliens-trainers.service';
import { ProxyService } from 'src/app/shared/services/proxy.service';
import { Client } from '../../shared/models/client.model';
import { CalendarService } from '../../shared/services/calendar.service';

declare const gapi: any;
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
  // providers: [EventService, ProxyService],
  providers: [ProxyService],
})
export class CalendarAppComponent implements OnInit {
  events: any[] = [];

  clients!: Client[];
  chosenClient: any = null;

  sessionForm!: FormGroup;

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
    private calendarService: CalendarService,
    private formBuilder: FormBuilder,
    private readonly proxyService: ProxyService,
    private readonly clientstrainersService: ClientsTrainersService,
    private readonly accessTokenService: AccessTokenService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.initializeComponent();
    // this.handleOAuthRedirect();
  }

  initializeComponent(): void {
    // this.getTrainerClients();
    this.createSessionForm();
    this.createCalendarOptions();

    this.calendarService.initializeGoogleApiClients();
    this.calendarService.loadGisClient();
    // this.loadAndDisplayEvents();
  }

  // handleOAuthRedirect(): void {
  //   const authCode = this.getAuthorizationCodeFromUrl();
  //   if (authCode) {
  //     console.log('Received auth code:', authCode);
  //     this.calendarService.exchangeCodeForTokens(authCode);
  //   }
  // }

  // getGoogleCalendarEvents(): Observable<any[]> {
  //   return this.calendarService.fetchGoogleCalendarToken().pipe(
  //     switchMap((token) => this.calendarService.fetchCalendarEvents(token)),
  //     map((response) =>
  //       response.items.map((event: any) => ({
  //         title: event.summary,
  //         start: event.start.dateTime || event.start.date, // Use dateTime for specific times, or date for all-day events
  //         end: event.end.dateTime || event.end.date,
  //         description: event.description,
  //         location: event.location,
  //         // Adapt other properties as needed
  //       }))
  //     )
  //   );
  // }

  // loadAndDisplayEvents(): void {
  //   this.getGoogleCalendarEvents().subscribe((events) => {
  //     this.calendarOptions = {
  //       ...this.calendarOptions,
  //       initialEvents: events, // Make sure your version of PrimeNG uses 'initialEvents' or equivalent
  //     };
  //   });
  // }

  createCalendarOptions() {
    this.calendarOptions = {
      ...this.calendarOptions,
      plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
      height: 720,
      initialDate: new Date().toISOString().split('T')[0],
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
      eventDrop: (info: any) => {
        let startDateTime = info.event.start;
        let endDateTime = info.event.end;

        let startDateTimeString = startDateTime
          .toLocaleString('sv-SE')
          .replace(' ', 'T')
          .slice(0, 19);
        let endDateTimeString = endDateTime
          .toLocaleString('sv-SE')
          .replace(' ', 'T')
          .slice(0, 19);

        let eventDescription = info.event.extendedProps.description;
        let eventLocation = info.event.extendedProps.location;
        let sessionId = info.event.extendedProps.sessionId;

        let sessionBundleId = info.event.id;

        this.submitEventWhenDragged(
          startDateTimeString,
          endDateTimeString,
          eventDescription,
          eventLocation,
          sessionBundleId,
          sessionId
        );
      },
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
    this.clientstrainersService
      .getTrainersClients(this.accessTokenService.getUserIdCookie())
      .subscribe((res: any) => {
        this.clients = res;
      });
    // this.proxyService
    //   .GetBundlesAndClientsByTrainerId({
    //     TRAINER_ID: this.accessTokenService.getUserIdCookie(),
    //   })
    //   .subscribe((res: any) => {
    //     this.clients = res.Bundlesandclients.map((client: any) => ({
    //       fullName: client.Client_Firstname + ' ' + client.Client_Lastname,
    //       user_id: client.Client_Id,
    //       bundle_id: client.Sessions_Bundle_Id,
    //       sessionsLeft: client.Sessions_Number,
    //       description: client.Description,
    //     }));
    //   });
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
    this.proxyService.Edit_Sessions_bundle_session(event).subscribe();
  }

  onClientChange(event: any) {
    this.chosenClient = event.value;
    this.sessionForm.patchValue({
      sessions_bundle_id: this.chosenClient.bundle_id,
      description: this.chosenClient.description,
    });
  }
  submitEventWhenDragged(
    startDateTime: string,
    endDateTime: string,
    description: string,
    location: string,
    sessionBundleId: number,
    sessionId: number
  ) {
    const event = {
      sessions_bundle_session_id: sessionBundleId,
      sessions_bundle_id: sessionId,
      done: this.sessionForm.value.done,
      start_date_time1: startDateTime,
      end_date_time: endDateTime,
      description: 'Location: ' + location + description,
    };
    this.proxyService.Edit_Sessions_bundle_session(event).subscribe();
  }
  handleAuthClick() {
    this.calendarService.handleAuthClick();
  }

  async listUpcomingEvents() {
    let response;
    try {
      const request = {
        calendarId: 'primary',
        timeMin: new Date().toISOString(),
        showDeleted: false,
        singleEvents: true,
        maxResults: 10,
        orderBy: 'startTime',
      };
      response = await gapi.client.calendar.events.list(request);
    } catch (err: any) {
      document.getElementById('content')!.innerText = err.message;
      return;
    }

    const events = response.result.items;
    if (!events || events.length == 0) {
      document.getElementById('content')!.innerText = 'No events found.';
      return;
    }
    // Flatten to string to display
    const output = events.reduce(
      (str: string, event: any) =>
        `${str}${event.summary} (${
          event.start.dateTime || event.start.date
        })\n`,
      'Events:\n'
    );
    document.getElementById('content')!.innerText = output;
  }

  getAuthorizationCodeFromUrl(): string | null {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    return code;
  }
}
