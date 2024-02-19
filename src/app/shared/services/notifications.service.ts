import { Injectable } from '@angular/core';
import { Message, MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  constructor(private readonly messageService: MessageService) {}

  showMessage(message: Message): void {
    this.messageService.add({
      summary: message.summary,
      severity: message.severity || 'error',
      detail: message.detail,
      key: message.key || 'global-toast',
      life: message.life || 3400,
      sticky: message.sticky || false,
      closable: message.closable || true,
    });
  }

  showSuccessMessage(detail: string): void {
    this.showMessage({
      detail: detail,
      severity: 'success',
      // summary: 'Success',
    });
  }

  showErrorMessage(detail: string, summary: string = 'Error'): void {
    this.showMessage({
      detail,
      severity: 'error',
      // summary,
    });
  }

  showInfoMessage(detail: string, summary: string = 'Info'): void {
    this.showMessage({
      detail,
      severity: 'info',
      // summary,
    });
  }

  showWarningMessage(detail: string, summary: string = 'Warning'): void {
    this.showMessage({
      detail,
      severity: 'warn',
      summary,
    });
  }
}
