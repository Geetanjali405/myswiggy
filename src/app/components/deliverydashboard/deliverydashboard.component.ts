import { Component, OnInit } from '@angular/core';
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
        console.log('line 26');
        console.warn(delivery);
      },
      (error) => {
        console.error('Error fetching delivery: ', error);
      }
    );
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
