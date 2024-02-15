import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
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
import {
  CreateSessionEventDto,
  clientBundle,
} from '../../shared/models/client.model';
// import { EventService } from '../../shared/services/event.service';
import { MessageService } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';
import { TrainerService } from '../../shared/services/trainer.service';
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
    MessagesModule,
  ],
  providers: [MessageService],
})
export class CalendarAppComponent implements OnInit {
  events: any[] = [];

  clients!: clientBundle[];
  chosenClient: any = null;

  sessionForm!: FormGroup;

  today: string = new Date().toISOString().split('T')[0];

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
    private formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly trainerService: TrainerService,
    private readonly messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.getSessionEvents();
    this.getTrainerClients();
    this.createSessionForm();

    this.calendarOptions = {
      ...this.calendarOptions,
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
    this.trainerService.getTrainerClients().subscribe((res: clientBundle[]) => {
      this.clients = res;
    });
  }

  createSessionForm() {
    this.sessionForm = this.formBuilder.group({
      sessionsBundleSessionId: [null],
      done: false,
      sessionsBundleId: [null],
      startDateTime: [null, Validators.required],
      endDateTime: [null, Validators.required],
      description: ' ',
      location: ' ',
    });
  }

  submitEvent() {
    const event: CreateSessionEventDto = {
      sessionsBundleSessionId: this.sessionForm.value.sessionsBundleSessionId,
      sessionsBundleId: this.sessionForm.get('sessionsBundleId')?.value,
      startDateTime: this.changedEvent.start,
      endDateTime: this.changedEvent.end,
      description: this.changedEvent.description,
      location: this.changedEvent.location,
    };

    this.trainerService.createSessionEvent(event).subscribe(() => {
      this.messageService.add({
        severity: 'success',
        detail: 'Event Created',
      });
      this.handleSave();
    });
  }

  onClientChange(event: any) {
    // this.chosenClient = event.value;
    // this.sessionForm.patchValue({
    //   sessions_bundle_id: this.chosenClient.bundle_id,
    //   description: this.chosenClient.description,
    // });

    const clientId = event.value.id;
    const isGhost = event.value.isGhost;
    this.trainerService
      .getClientBundle(clientId, isGhost)
      .subscribe((res: any) => {
        this.sessionForm.get('sessionsBundleId')?.patchValue(res[0].id);
        this.sessionForm.get('description')?.patchValue(res[0].description);
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
    // this.proxyService.Edit_Sessions_bundle_session(event).subscribe();
  }

  getSessionEvents() {
    this.trainerService.getTrainerEvents().subscribe((res) => {
      this.events = res.map((item: any) => {
        return {
          id: item.id,
          title: `${item.firstname} ${item.lastname}`,
          start: item.startdatetime,
          end: item.enddatetime,
          description: item.description,
          location: item.location,
          sessionsBundleSessionId: item.id,
        };
      });
      console.log(this.events);
      this.calendarOptions = {
        ...this.calendarOptions,
        events: this.events,
      };
    });
  }
}
