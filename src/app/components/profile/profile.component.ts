import { Component, OnInit, AfterViewInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
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
import { CartService } from 'src/shared/services/cart.service';
import { RestaurantService } from 'src/shared/services/restaurant.service';
import { UserService } from 'src/shared/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
addToCart(_t30: any) {
throw new Error('Method not implemented.');
}
  // orderChart: Chart;
  constructor(
    private userService: UserService,
    private cartService: CartService,
    private restaurantService:RestaurantService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private snackBar: MatSnackBar
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
  foodrecList: string[];
  id: string;
  foodList = [];
  public link: string = 'Swiggy is the best food delivery app available !!'

  ngOnInit(): void {
    this.email = localStorage.getItem('email');
    console.warn('email');

    const userString = localStorage.getItem('user');
    this.userData = JSON.parse(userString);
    this.userId = localStorage.getItem('id');


    this.populatedelivery();
    this.getFav(this.userId);
  }
  // ngAfterViewInit() {
  //   this.displayOrderChart();
  // }
  populatedelivery() {
    this.userService.getUsers().subscribe({
      next: (res) => {
        this.users = res;
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

  getFav(id: string) {
    if(id) {
      this.userService.getrecFood(id).subscribe({
        next: (response) => {
          this.foodrecList = response;
          this.foodrecList.forEach((fav) => {
            this.restaurantService.getMenubyId(fav).subscribe({
              next: (res) => {
                
                this.foodList.push(res);
              },
              error: (error) => {
                console.log('Error in fetching restaurant details', error);
              },
            });
          });
        
        },
        error: (error) => {
          console.log('Error in fetching food rec details', error);
          
        },
      });
    }
  
  }

  addIteminCart(menuId: string) {
    this.cartService.addItemToCart(this.userId, menuId).subscribe(
      (data) => {
        
        this.snackBar.open('Item added to cart', 'OK', {
          duration: 3000,
        });
        
      },
      (error) => {
        console.error('Error while adding item to cart: ');
        console.error(error);
      }
    );
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
