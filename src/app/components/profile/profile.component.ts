import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import {
//   ConfirmationService,
//   MessageService,
//   ConfirmEventType,
// } from 'primeng/api';

import {
  ConfirmationService,
  MessageService,
  ConfirmEventType,
} from 'primeng/api';
import { UserService } from 'src/shared/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  constructor(
    private userService: UserService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}
  userId: string;
  userData: any;
  email: any;

  ngOnInit(): void {
    this.email = localStorage.getItem('email');
    console.warn('email');

    const userString = localStorage.getItem('user');
    this.userData = JSON.parse(userString);
    console.log(this.userData);
    this.userId = localStorage.getItem('id');

  }

  confirm(event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Are you sure that you want to logout ?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        localStorage.clear();
        this.router.navigate(['/mainhome']);
        this.messageService.add({
          severity: 'info',
          summary: 'Confirmed',
          detail: 'You have succesfully logged out',
        });
        // this.router.navigate(['/mainhome']);
        
        
      },
      reject: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Rejected',
          detail: 'You are still logged in',
        });
      },
    });
  }

  logout() {
    localStorage.clear();
    // this.router.navigate(['/login']);
  }
}
