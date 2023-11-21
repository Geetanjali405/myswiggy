import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { CartService } from 'src/shared/services/cart.service';
import { UserService } from 'src/shared/services/user.service';

@Component({
  selector: 'app-orderstatus',
  templateUrl: './orderstatus.component.html',
  styleUrls: ['./orderstatus.component.scss'],
})
export class OrderstatusComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  userId: string;
  cartId: string;
  status: string;
  orderStatusInterval = null;
  cart: import('c:/Users/GEBGS00/Desktop/Capstone/myswiggy/src/shared/model/cart').Cart;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private cartService:CartService
  ) {}
  ngOnInit(): void {
    this.userId = localStorage.getItem('id');
    console.warn(this.userId);
    this.getcartid();
    // this.cartId = localStorage.getItem('caryId');
    console.warn(this.cartId);

    this.orderStatusInterval = setInterval(() => {
      this.getOrderStatus(this.cartId);
    }, 6500);
  }
  ngOnDestroy(): void {
    clearInterval(this.orderStatusInterval);
  }
  getcartid() {
    this.cartService.getCart(this.userId).subscribe((cart) => {
      this.cart = cart;
      this.cartId = this.cart.id;
    });
  }

  getOrderStatus(cartId: string) {
    console.warn('inside get order status');
    this.userService.getOrderStatuss(this.cartId).subscribe({
      next: (response) => {
        this.status = response;
        if (this.status === 'Delivered') {
          this.cartService.deleteCart(this.userId).subscribe({
            next: (response) => {
              console.log(response);

              this.cartService.createCart(this.userId).subscribe({
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
          //dialog popup
          
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
