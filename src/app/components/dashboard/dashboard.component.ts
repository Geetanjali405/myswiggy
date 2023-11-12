import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarComponent } from 'src/shared/sharedcomp/navbar/navbar.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  constructor(private router: Router) {}
}
