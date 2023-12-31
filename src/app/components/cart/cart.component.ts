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
import { CartService } from 'src/shared/services/cart.service';
import { RestaurantService } from 'src/shared/services/restaurant.service';
import { Menu } from 'src/shared/model/menu';

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
  menu: Menu;
  rou = null;
  public link: string = 'Order from swiggy now!!';
  itemNames: string[] = [];
  constructor(
    private router: Router,
    private userService: UserService,
    private cartService: CartService,
    private restaurantService: RestaurantService,
    private snackBar: MatSnackBar,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.userId = localStorage.getItem('id');
    this.populateCart();
    this.getOrderStatus(this.cartId);
    this.invokeStripe();
  }

  messages: string[] = [
    'Your cart is as empty as a desert. Time to make it bloom with products!',
    'Oops! Your cart looks lonely. Let\'s find some friends for it.',
    'It seems your shopping journey hasnt started yet. Let\'s embark on it together!',
    'Your cart is an empty canvas. Let\'s paint it with vibrant products!',
    'Your cart is waiting for a shopping spree. Let\'s fill it up!',
    'Looks like your cart is on a diet. How about we add some healthy products?',
    'Your cart is empty, but the world of shopping is vast and full!',
    'Your cart is currently enjoying a zen moment of emptiness. Time to shake things up!',
    'Your cart is in hibernation mode. Let\'s wake it up with some cool products!',
    'Your cart is playing hide and seek, and the products are yet to be found!'
];
  getRandomMessage(): string {
    const randomIndex = Math.floor(Math.random() * this.messages.length);
    return this.messages[randomIndex];
}

  /**
   * @function populateCart to render cart in DOM
   */
  populateCart() {
    this.cartService.getCart(this.userId).subscribe({
      next: (cart) => {
        this.cart = cart;
        this.cartId = this.cart.id;
        localStorage.setItem('cartId', this.cartId);
        for (let itemId in this.cart.items) {
          this.getItembyId(itemId);
        }
      },
      error: (error) => {
        console.error('Error fetching cart: ', error);
      },
    });
  }

  /**
   * @function removeItem removes an item from the cart based on the given menuId.
   * It calls the removeItem method from the cartService and updates the cart.
   * @param {string} menuId - The id of the menu item to be removed from the cart.
   * @return {void} - This method does not return anything. */
  removeItem(menuId: string) {
    this.cartService.removeItem(this.userId, menuId).subscribe({
      next: (cart) => {
        this.snackBar.open('Item removed from cart', 'OK');
        this.cart = cart;
        this.populateCart();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  /**
   * @function increaseItem the quantity of the item with the given menuId in the user's cart by one.
   * The function calls the addItemToCart method from the cartService and updates the cart accordingly.
   * If successful, it displays a message and repopulates the cart with updated data.
   * @param menuId The id of the menu item to be increased in the cart.
   */
  increaseItem(menuId: string) {
    this.cartService.addItemToCart(this.userId, menuId).subscribe({
      next: (data) => {
        this.snackBar.open('Cart Updated', 'OK', {
          duration: 3000,
        });
        this.cartService.addtofood(this.userId, menuId).subscribe({
          next: (data) => {
            this.populateCart();
          },
          error: (error) => {
            console.error('Error : ' + error);
          },
        });
      },
      error: (error) => {
        console.error('Error while increasing item in cart: ' + error);
      },
    });
  }

  addtofood(menuId: string) {
    this.cartService.addtofood(this.userId, menuId).subscribe({
      next: (data) => {},
      error: (error) => {
        console.error('Error : ' + error);
      },
    });
  }

  /**
   * @function decreaseItem Decreases the quantity of the item with the given menuId in the user's cart by one. The function calls the decreaseItem method from the cartService and updates the cart accordingly.If successful, it repopulates the cart with updated data.
   * @param menuId  The id of the menu item to be decreased in the cart.
   */
  decreaseItem(menuId: string) {
    this.cartService.decreaseItem(this.userId, menuId).subscribe(
      (data) => {
        this.snackBar.open('Cart Updated', 'OK', {
          duration: 3000,
        });
        this.populateCart();
      },
      (error) => {
        console.error('Error while decreasing item in cart: ' + error);
      }
    );
  }

  /**
   * @function makePayment calls the integrated stripe connection
   * @param amount takes amount for payment
   * @param id  takes the cartId/orderId
   */
  makePayment(amount: number, id: any) {
    this.userService.addToDelivery(id).subscribe({
      next: (res) => {
        this.rou = setTimeout(() => {
          this.router.navigate(['/orderstatuscomp']);
        }, 20000);
      },
      error: (er) => {
        console.warn(er);
      },
    });

    const paymentHandler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_51O0D4kSGOSBMEK547xBZt1fmSQFw9w3r0YRpCrtCxvvA1vYrDyqnwlfUcFYDIzxpoLIpJChr7qrxdcSSnSRcoVrR00iOqeCNAt',
      locale: 'auto',
      token: function (stripeToken: any) {
        // alert('Stripe token generated!');
        // this.router.navigate(['/orderstatuscomp']);
      },
    });
    paymentHandler.open({
      name: 'MySwiggy',
      description: 'Eat good💗',
      amount: amount * 100,
      currency:'inr'
      
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
          token: function (stripeToken: any) {},
        });
      };
      window.document.body.appendChild(script);
    }
  }

  /**
   * @function getOrderStatusRetrieves the status of the order with the given cartId.
   *
   * The function calls the getOrderStatuss method from the userService and assigns the response to this.*status variable.If the order status is 'Order Placed', it redirects the user to the OrderStatusComp *component.
   * @param cartId
   */
  getOrderStatus(cartId: string) {
    console.warn('inside get order status');
    this.userService.getOrderStatuss(this.cartId).subscribe({
      next: (response) => {
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

  /**
   * @function getItembyId Retrieves the details of the menu item with the given id from the userService If successful, it assigns the response to the this.menu variable, adds the item name to the this.itemNames array, and logs the response and item names to the console
   * @param id  itemId
   */
  getItembyId(id: string) {
    this.subscription = this.restaurantService.getMenubyId(id).subscribe({
      next: (response) => {
        this.menu = response;
        this.itemNames.push(this.menu.name);
      },
      error: (error) => {
        console.log('Error in fetching menu id details', error);
      },
    });
  }

  /**
   *
   * @param event ng prime confirm popup
   */
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
