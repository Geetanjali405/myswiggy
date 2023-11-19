import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Cart } from 'src/shared/model/cart';
import { UserService } from 'src/shared/services/user.service';
import {
  ConfirmationService,
  MessageService,
  ConfirmEventType,
} from 'primeng/api';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  Razorpay: any;
  subscription: Subscription;
  cart: Cart;
  userId: string;
  cartId: string;
  paymentHandler: any = null;
  status: string;
  statusorder: string;
  orderStatusInterval = null;
  menu: any;
  rou = null;
  itemNames: any[] = [];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private _snackBar: MatSnackBar,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  ngOnInit(): void {
    this.userId = localStorage.getItem('id');
    console.log('hi');
    this.populateCart();
    this.getOrderStatus(this.cartId);
    // this.orderStatusInterval = setInterval(() => {

    // }, 5000);

    this.invokeStripe();
  }

  // ngOnDestroy(): void {
  //   clearInterval(this.rou);
  // }

  populateCart() {
    this.userService.getCart(this.userId).subscribe(
      (cart) => {
        this.cart = cart;
        this.cartId = this.cart.id;
        localStorage.setItem('cartId', this.cartId);
        // this.statusorder = this.getOrderStatus(this.cartId);
        for (let itemId in this.cart.items) {
          this.menu = this.getItembyId(itemId);
          // this.menu=JSON.parse(this.menu);

          // console.log(this.getItem(itemId));
        }
        console.log(this.cart.items);
        console.log(this.cart);
      },
      (error) => {
        console.error('Error fetching cart: ', error);
      }
    );
  }
  removeItem(menuId: any) {
    this.userService.removeItem(this.userId, menuId).subscribe(
      (cart) => {
        console.log('Removed item from cart');
        this.openSnackBar('Item removed from cart', 'OK');
        this.cart = cart;
        this.populateCart();
      },
      (error) => {
        console.log(error);
      }
    );
  }
  increaseItem(menuId: any) {
    this.userService.addItemToCart(this.userId, menuId).subscribe(
      (data) => {
        console.log('Item increased by 1 successfully!');
        this.openSnackBar('Cart Updated', 'OK');
        this.populateCart();
      },
      (error) => {
        console.error('Error while increasing item in cart: ' + error);
      }
    );
  }
  decreaseItem(menuId: any) {
    this.userService.decreaseItem(this.userId, menuId).subscribe(
      (data) => {
        console.log('Item decresed by 1 successfully!');
        this.populateCart();
      },
      (error) => {
        console.error('Error while decreasing item in cart: ' + error);
      }
    );
  }
  makePayment(amount: any, id: any) {
    this.userService.addToDelivery(id).subscribe({
      next: (res) => {
        this.rou = setTimeout(() => {
          this.router.navigate(['/orderstatuscomp']);
        }, 20000);
        console.log(res);
      },
      error: (er) => {
        console.warn(er);
      },
    });

    const paymentHandler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_51O0D4kSGOSBMEK547xBZt1fmSQFw9w3r0YRpCrtCxvvA1vYrDyqnwlfUcFYDIzxpoLIpJChr7qrxdcSSnSRcoVrR00iOqeCNAt',
      locale: 'auto',
      token: function (stripeToken: any) {
        console.log(stripeToken);
        // alert('Stripe token generated!');
      },
    });
    paymentHandler.open({
      name: 'MySwiggy',
      description: 'Eat good💗',
      amount: amount * 100,
    });
  }
  invokeStripe() {
    if (!window.document.getElementById('stripe-script')) {
      const script = window.document.createElement('script');
      script.id = 'stripe-script';
      script.type = 'text/javascript';
      script.src = 'https://checkout.stripe.com/checkout.js';
      script.onload = () => {
        this.paymentHandler = (<any>window).StripeCheckout.configure({
          key: 'pk_test_51H7bbSE2RcKvfXD4DZhu',
          locale: 'auto',
          token: function (stripeToken: any) {
            // console.log(stripeToken);
            // alert('Payment has been successfull!');
          },
        });
      };
      window.document.body.appendChild(script);
    }
  }
  getOrderStatus(cartId: string) {
    console.warn('inside get order status');
    this.userService.getOrderStatuss(this.cartId).subscribe({
      next: (response) => {
        // console.log(response.body);
        this.status = response;
        this.statusorder = response;
        if (this.status === 'Order Placed') {
          this.router.navigate(['/orderstatuscomp']);
        }
      },
      error: (error) => {
        console.error(error);
        console.error('Error parsing JSON', error);
      },
    });
  }

  getItembyId(id: string) {
    this.subscription = this.userService.getMenubyId(id).subscribe(
      (response) => {
        this.menu = response;
        console.log(response);
        this.itemNames.push(this.menu.name);
        console.log(this.itemNames);
      },
      (error) => {
        console.log('Error in fetching menu id details', error);
      }
    );
  }

  confirm(event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Do you want to proceed with payment?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.makePayment(this.cart.total, this.cart.id);
        this.messageService.add({
          severity: 'info',
          summary: 'Confirmed',
          detail: 'Payment processing !',
        });
      },
      reject: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Rejected',
          detail: 'You have rejected payment',
        });
      },
    });
  }
}
