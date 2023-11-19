import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService ,ConfirmEventType } from 'primeng/api';

import { UserService } from 'src/shared/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  constructor(private userService: UserService, private router: Router,private confirmationService: ConfirmationService,private messageService: MessageService) {}
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

    // this.profile(this.userId);
  }

  // profile(userId: string) {
  //   this.userService.getUserById(userId).subscribe(
  //     (data) => {
  //       console.log(data);
  //       this.userData = data;
  //       console.log(data.id);
  //       console.log(this.userData);
  //       console.log(this.userData.id);
  //       console.log(this.userData.password);
  //     },
  //     (error) => {
  //       console.error(error);
  //     }
  //   );
  // }

  confirm1() {
    this.confirmationService.confirm({
        message: 'Are you sure that you want to proceed?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted to log out' });
        },
        reject: (type) => {
            switch (type: ConfirmEventType) {
                case ConfirmEventType.REJECT:
                    this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
                    break;
                case ConfirmEventType.CANCEL:
                    this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: 'You have cancelled' });
                    break;
                default:
  
            }
        }
    });
}

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
