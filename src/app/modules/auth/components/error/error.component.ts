import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  templateUrl: './error.component.html',
  standalone: true,
  imports: [ButtonModule, RouterModule],
})
export class ErrorComponent {}
