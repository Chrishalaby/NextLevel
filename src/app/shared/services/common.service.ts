import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  public APIUrl = 'http://16.171.151.92/api/data';
  public ticket = '';

  constructor() {}

  ShowMessage(message: string, d: number = 1000) {
    alert(message);
  }

  Handle_Exception(msg: any) {
    if (msg != null && msg !== '') {
      this.ShowMessage(msg, 3000);
    }
  }

  setTicket(ticket: string) {
    this.ticket = ticket;
  }
}
