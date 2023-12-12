import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DeliveryData } from 'src/shared/model/delivery';
import { User } from 'src/shared/model/user';
import { CartService } from 'src/shared/services/cart.service';
import { RestaurantService } from 'src/shared/services/restaurant.service';
import { UserService } from 'src/shared/services/user.service';

@Component({
  selector: 'app-adminpanel',
  templateUrl: './adminpanel.component.html',
  styleUrls: ['./adminpanel.component.scss'],
})
export class AdminpanelComponent implements OnInit {
  // orderChart: Chart;

  constructor(
    private userService: UserService,
    private router: Router,
    private snackbar: MatSnackBar
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
  id: string;

  paginatedUsers: User[] = [];
  pageSize: number = 5;
  currentPageIndex: number = 0;
  pageLength: number = 0;

  datareject = {
    service_id: 'service_193f3p1',
    template_id: 'template_iiavvq6',
    user_id: 'b3_hKUshfY5bCffOw',
  };

  dataapprove = {
    service_id: 'service_193f3p1',
    template_id: 'template_s8dx13j',
    user_id: 'b3_hKUshfY5bCffOw',
  };

  ngOnInit(): void {
    this.email = localStorage.getItem('email');
    console.warn('email');
    const userString = localStorage.getItem('user');
    this.userData = JSON.parse(userString);
    this.userId = localStorage.getItem('id');
    this.populatedelivery();
  }

  populatedelivery() {
    this.userService.getUsers().subscribe({
      next: (res) => {
        this.users = res.reverse();
        console.log(this.users);
        this.pageLength = this.users.length; // Store the length of the data
        this.paginateUsers(this.currentPageIndex, this.pageSize);
      },
      error: (error) => {
        console.error('Error fetching details of delivery users: ', error);
      },
    });
    this.userService.getDelivery().subscribe({
      next: (delivery) => {
        this.delivery = delivery;

        for (let status in this.delivery.orderIdAndStatus) {
          if (this.delivery.orderIdAndStatus[status] === 'Delivered') {
            this.deliveredCount++;
          } else if (
            this.delivery.orderIdAndStatus[status] === 'Order Rejected'
          ) {
            this.rejectedCount++;
          }
        }
        this.displayOrderChart();
        this.displaypiechart();
      },
      error: (error) => {
        console.error('Error fetching delivery details: ', error);
      },
    });
  }
  paginateUsers(currentPageIndex: number, pageSize: number) {
    this.currentPageIndex = currentPageIndex;
    this.pageSize = pageSize;
    const startIndex = this.currentPageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pageLength = this.users.length;
    this.paginatedUsers = this.users.slice(startIndex, endIndex);
  }
  handlePageChange(event: PageEvent) {
    this.currentPageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.paginateUsers(this.currentPageIndex, this.pageSize);
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
            '  rgba(34,139,34,0.2)',
            'rgba(255, 159, 64, 0.2)',
            // 'rgba(75, 192, 192, 0.2)',
          ],
          borderColor: ['  rgba(34,139,34,0.2)', 'rgba(255, 159, 64, 0.2)'],
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
            color: textColor,
          },
        },
      },
    };
  }
  approve(id: string) {
    this.userService.approve(id).subscribe({
      next: (res) => {
        console.log('approved');
        this.snackbar.open('User is approved !!', 'OK', {
          duration: 3000,
        });
        this.userService.sendmail(this.dataapprove).subscribe({
          next: (res) => {
            console.log('mail sent for approval');
          },
          error: (error) => {
            console.error('Error in sending mail: ', error);
          },
        });
      },
      error: (error) => {
        console.error('Error fetching details of delivery users: ', error);
      },
    });
  }
  reject(id: string) {
    this.userService.reject(id).subscribe({
      next: (res) => {
        console.log('rejected');
        this.snackbar.open('User is rejected', 'OK', {
          duration: 3000,
        });
        this.userService.sendmail(this.datareject).subscribe({
          next: (res) => {
            console.log('mail sent for rejection');
          },
          error: (error) => {
            console.error('Error in sending mail: ', error);
          },
        });
      },
      error: (error) => {
        console.error('Error fetching details of delivery users: ', error);
      },
    });
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/mainhome']);
  }
}
