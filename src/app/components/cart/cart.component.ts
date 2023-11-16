import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from 'src/shared/services/user.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  Razorpay: any;
  subscription: Subscription;
  cart: any;
  userId: string;
  cartId: any;
  paymentHandler: any = null;
  status: any;
  statusorder: any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.userId = localStorage.getItem('id');
    console.log('hi');
    this.getOrderStatus();
    this.invokeStripe();
  }

  populateCart() {
    this.userService.getCart(this.userId).subscribe(
      (cart) => {
        this.cart = cart;
        // console.log('line 26');
        // console.warn(cart);
        // console.error(this.cart.id);
        this.cartId = this.cart.id;
        // this.statusorder = this.getOrderStatus(this.cartId);
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
  Payment() {
    // alert('payment successfull');
  }

  getOrderStatus() {
    console.warn('inside get order status');
    // this.userService.getOrderStatuss(orderId).subscribe({
    //   next: (response) => {
    //     console.log(response.body);
    //     this.status = response;
    //     this.statusorder = response;
    //     console.warn(this.statusorder);
    //     console.log('Response as string:', response);
    //   },
    //   error: (error) => {
    //     console.error(error);
    //     console.error('Error parsing JSON', error);
    //   },
    // });
    // this.userService.getOrderStatuss(orderId);
    this.userService.orderStatusBS$.subscribe({
      next: (response) => {
        console.warn('inside Behavior subject sub');
        console.log(response);
        this.statusorder = response;
        console.log("Status order: "+this.statusorder);
        this.populateCart();
      },
      error: (error) => {
        console.error(error);
        console.error('Error parsing JSON', error);
      },
    });
  }
}
