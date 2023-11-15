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
  subscription: Subscription;
  cart: any;
  userId: string;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.userId = localStorage.getItem('id');
    this.populateCart();
  }

  populateCart() {
    this.userService.getCart(this.userId).subscribe(
      (cart) => {
        this.cart = cart;
        console.log('line 26');
        console.warn(cart);
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
}
