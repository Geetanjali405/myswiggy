import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Subject, Subscription } from 'rxjs';
import { DeliveryData } from 'src/shared/model/delivery';
import { UserService } from 'src/shared/services/user.service';

@Component({
  selector: 'app-deliverydashboard',
  templateUrl: './deliverydashboard.component.html',
  styleUrls: ['./deliverydashboard.component.scss'],
})
export class DeliverydashboardComponent implements OnInit {

  subscription: Subscription;
  cartId: string;
  delivery: DeliveryData;
  paginatedDelivery: any;
  pageSize: number = 5; // default page size
  currentPageIndex: number = 0; // default current page index
  pageLength: number;
  filteredDelievery;
  totalOrders:number = 0;
  // modalCloseSpan: HTMLElement;

  constructor(
    private userService: UserService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.populateCart();
  }

  
  populateCart() {
    this.userService.getDelivery().subscribe(
      (delivery) => {
        this.delivery = delivery;
        this.totalOrders = Object.keys(this.delivery?.orderIdAndStatus || {}).length;
        this.paginateDelivery();
      },
      (error) => {
        console.error('Error fetching delivery: ', error);
      }
    );
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
    this.userService.updateStatusofOrder(orderId).subscribe(
      (delivery) => {
        console.log(delivery);
        this.snackBar.open("Order status updated successfully!", "OK", {
          duration: 3000
        })
        this.populateCart();
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
