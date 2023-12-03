import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeliveryData } from 'src/shared/model/delivery';
import { UserService } from 'src/shared/services/user.service';
import {
  ConfirmationService,
  MessageService,
  ConfirmEventType,
} from 'primeng/api';

@Component({
  selector: 'app-deliverydashboard',
  templateUrl: './deliverydashboard.component.html',
  styleUrls: ['./deliverydashboard.component.scss'],
})
export class DeliverydashboardComponent implements OnInit {
  cartId: string;
  delivery: DeliveryData;
  paginatedDelivery: any;
  pageSize: number = 5;
  currentPageIndex: number = 0;
  pageLength: number;
  filteredDelievery;
  totalOrders: number = 0;

  constructor(
    private userService: UserService,
    private snackBar: MatSnackBar,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.populateDelivery();
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
    const keys = Object.keys(this.delivery?.orderIdAndStatus || {});
    const totalOrders = keys.length;
    const paginatedDelivery = {};
    for (let i = startIndex; i < endIndex && i < totalOrders; i++) {
      const key = keys[i];
      paginatedDelivery[key] = this.delivery.orderIdAndStatus[key];
    }
    console.log(paginatedDelivery);
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
    this.userService.updateStatusofOrder(orderId).subscribe({
      next: (delivery) => {
        console.log(delivery);
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
        console.log(delivery);
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
