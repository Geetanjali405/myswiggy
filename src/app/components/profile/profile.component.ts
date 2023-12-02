import { Component, OnInit, AfterViewInit } from '@angular/core';
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
import { DeliveryData } from 'src/shared/model/delivery';
import { User } from 'src/shared/model/user';
import { UserService } from 'src/shared/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  // orderChart: Chart;
  constructor(
    private userService: UserService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}
  userId: string;
  userData: User;
  email: string;
  users: User[];
  delivery: DeliveryData;
  deliveredCount = 0;
  rejectedCount = 0;
  basicData: any;
  basicOptions: any;
  basicDataa: any;
  basicOptionss: any;

  ngOnInit(): void {
    this.email = localStorage.getItem('email');
    console.warn('email');

    const userString = localStorage.getItem('user');
    this.userData = JSON.parse(userString);
    console.log(this.userData);
    console.log(this.userData.userType);
    this.userId = localStorage.getItem('id');
    this.populatedelivery();
    // this.displayOrderChart();
    // this.displayOrderChart();
  }
  // ngAfterViewInit() {
  //   this.displayOrderChart();
  // }
  populatedelivery() {
    this.userService.getUsers().subscribe({
      next: (res) => {
        this.users = res;
        console.log(this.users);
      },
      error: (error) => {
        console.error('Error fetching details of delivery users: ', error);
      },
    });
    this.userService.getDelivery().subscribe({
      next: (delivery) => {
        this.delivery = delivery;
        console.log(delivery);

        for (let status in this.delivery.orderIdAndStatus) {
          if (this.delivery.orderIdAndStatus[status] === 'Delivered') {
            this.deliveredCount++;
          } else if (
            this.delivery.orderIdAndStatus[status] === 'Order Rejected'
          ) {
            this.rejectedCount++;
          }
        }
        console.log('Delivered orders: ', this.deliveredCount);
        console.log('Rejected orders: ', this.rejectedCount);
        this.displayOrderChart();
        this.displaypiechart();
      },
      error: (error) => {
        console.error('Error fetching delivery details: ', error);
      },
    });
  }

  displayOrderChart() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue(
      '--text-color-secondary'
    );
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
   

    this.basicData = {
      labels: ['Delivered', 'Rejected'],
      datasets: [
        {
          label: 'Delievery Stats',
          data: [this.deliveredCount, this.rejectedCount],
          backgroundColor: [
            'rgba(255, 159, 64, 0.2)',
            'rgba(75, 192, 192, 0.2)',
          ],
          borderColor: ['rgb(255, 159, 64)', 'rgb(75, 192, 192)'],
          borderWidth: 1,
        },
      ],
    };

    const maxCount = Math.max(this.deliveredCount, this.rejectedCount);
    this.basicOptions = {
      plugins: {
        legend: {
          labels: {
            color: textColor,
          },
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            color: textColorSecondary,
            max: maxCount + 15,
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false,
          },
        },
        x: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false,
          },
        },
      },
    };
  }

  displaypiechart() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');

    this.basicDataa = {
      labels: ['Delivered', 'Rejected'],
      datasets: [
        {
          label: 'Delievery Stats',
          data: [this.deliveredCount, this.rejectedCount],
          backgroundColor: [
            'rgba(255, 159, 64, 0.2)',
            'rgba(75, 192, 192, 0.2)',
          ],
          borderColor: ['rgb(255, 159, 64)', 'rgb(75, 192, 192)'],
          borderWidth: 1,
        },
      ],
    };


    this.basicOptionss = {
        cutout: '60%',
        plugins: {
            legend: {
                labels: {
                    color: textColor
                }
            }
        }
    };
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
