import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { UserService } from 'src/shared/services/user.service';

@Component({
  selector: 'app-orderstatus',
  templateUrl: './orderstatus.component.html',
  styleUrls: ['./orderstatus.component.scss'],
})
export class OrderstatusComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  userId: string;
  cartId: any;
  status: string;
  orderStatusInterval = null;
  cart: import('c:/Users/GEBGS00/Desktop/Capstone/myswiggy/src/shared/model/cart').Cart;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {}
  ngOnInit(): void {
    this.userId = localStorage.getItem('id');
    console.warn(this.userId);
    this.getcartid();
    // this.cartId = localStorage.getItem('caryId');
    console.warn(this.cartId);

    this.orderStatusInterval = setInterval(() => {
      this.getOrderStatus(this.cartId);
    }, 6000);
  }
  ngOnDestroy(): void {
    clearInterval(this.orderStatusInterval);
  }
  getcartid() {
    this.userService.getCart(this.userId).subscribe((cart) => {
      this.cart = cart;
      this.cartId = this.cart.id;
    });
  }

  getOrderStatus(cartId: string) {
    console.warn('inside get order status');
    this.userService.getOrderStatuss(this.cartId).subscribe({
      next: (response) => {
        console.log(response.body);
        this.status = response;
        if (this.status === 'Delivered') {
          this.userService.deleteCart(this.userId).subscribe({
            next: (response) => {
              console.log(response);

              this.userService.createCart(this.userId).subscribe({
                next: (newcart) => {
                  console.log('New Cart created: ', newcart);
                  this.cart = newcart;
                  this.cartId = this.cart.id;
                  localStorage.setItem('cartId', this.cartId);
                },
                error: (err) => {
                  console.error(err);
                },
              });
            },
            error: (err) => {
              console.error(err);
            },
          });
          this.router.navigate(['/dashboard']);
        }
        // this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        console.error(error);
        console.error('Error parsing JSON', error);
      },
    });
  }
}
