import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeliveryData } from 'src/shared/model/delivery';
import { UserService } from 'src/shared/services/user.service';
import {
  ConfirmationService,
  MessageService,
  ConfirmEventType,
} from 'primeng/api';
import { User } from 'src/shared/model/user';

@Component({
  selector: 'app-deliverydashboard',
  templateUrl: './deliverydashboard.component.html',
  styleUrls: ['./deliverydashboard.component.scss'],
})
export class DeliverydashboardComponent implements OnInit ,OnDestroy{
  cartId: string;
  delivery: DeliveryData;
  paginatedDelivery: any;
  pageSize: number = 5;
  currentPageIndex: number = 0;
  pageLength: number;
  filteredDelievery;
  totalOrders: number = 0;
  userId: string;
  user: User;
  status: string;
  emailveri: string;
  statusint: any;

  constructor(
    private userService: UserService,
    private snackBar: MatSnackBar,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.populateDelivery();
    const userString = localStorage.getItem('user');
    this.user = JSON.parse(userString);
    this.userId = localStorage.getItem('id');

    this.statusint = setInterval(() => {
      this.getinfo(this.userId);
    }, 2000);
  }
  ngOnDestroy(): void {
    clearInterval(this.statusint);
  }
  getinfo(userId: string) {
    this.userService.getuserstatus(userId).subscribe({
      next: (res) => {
        this.status = res;
      },
      error: (err) => {
        console.error(err);
      }

    })
  }

  populateDelivery() {
    this.userService.getDelivery().subscribe({
      next: (delivery) => {
        this.delivery = delivery;
        this.totalOrders = Object.keys(
          this.delivery?.orderIdAndStatus || {}
        ).length;
        this.paginateDelivery();
      },
      error: (error) => {
        console.error('Error fetching delivery: ', error);
      },
    });
  }

  paginateDelivery() {
    const startIndex = this.currentPageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    const keys = Object.keys(this.delivery?.orderIdAndStatus || {}).reverse(); // Reverse the keys array
    const totalOrders = keys.length;
    const paginatedDelivery = {};
    for (let i = startIndex; i < endIndex && i < totalOrders; i++) {
      const key = keys[i];
      paginatedDelivery[key] = this.delivery.orderIdAndStatus[key];
    }

    this.paginatedDelivery = paginatedDelivery;
    this.pageLength = Math.ceil(totalOrders / this.pageSize);
    this.totalOrders = totalOrders;
  }

  handlePageChange(event: any) {
    this.currentPageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.paginateDelivery();
  }

  showUpdateStatusPopup(orderId: any) {
    this.userService.updateStatusofOrder(orderId, this.userId).subscribe({
      next: (delivery) => {
        this.snackBar.open('Order status updated successfully!', 'OK', {
          duration: 3000,
        });
        this.populateDelivery();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  confirm(event: Event, orderId: any) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Do you want to reject the order?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.rejectOrder(orderId);
        this.messageService.add({
          severity: 'info',
          summary: 'Confirmed',
          detail: 'Order Rejected !',
        });
      },
      reject: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Rejected',
          detail: 'Order Not Rejected !',
        });
      },
    });
  }

  rejectOrder(orderId: any) {
    this.userService.rejectorder(orderId).subscribe({
      next: (delivery) => {
        this.snackBar.open('Order rejected successfully!', 'OK', {
          duration: 3000,
        });
        this.populateDelivery();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
