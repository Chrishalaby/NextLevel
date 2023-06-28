import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  templateUrl: './accessdenied.component.html',
  standalone: true,
  imports: [ButtonModule, RouterModule],
})
export class AccessdeniedComponent {}
