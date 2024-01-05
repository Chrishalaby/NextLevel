import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-logout-confirmation-dialog',
  templateUrl: './logout-confirmation-dialog.component.html',
})
export class LogoutConfirmationDialogComponent {
  constructor(public dialogRef: MatDialogRef<LogoutConfirmationDialogComponent>) {}

  onConfirmClick(): void {
    this.dialogRef.close('confirm');
  }

  onCancelClick(): void {
    this.dialogRef.close('cancel');
  }
}
