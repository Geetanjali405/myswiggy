import { Component, OnInit } from '@angular/core';
import { Cart } from 'src/shared/model/cart';
import { User } from 'src/shared/model/user';
import { CartService } from 'src/shared/services/cart.service';
import { UserService } from 'src/shared/services/user.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  userData: User;
  userType: string;
  cart: Cart;
  cartId: string;
  userId: string;
  constructor(
    private userService: UserService,
    private cartService: CartService
  ) {}
  ngOnInit(): void {
    const userString = localStorage.getItem('user');
    this.userData = JSON.parse(userString);
    this.userId = this.userData.id;
    this.userType = this.userData.userType;
    this.getcartid();
  }

  getcartid() {
    this.cartService.getCart(this.userId).subscribe((cart) => {
      this.cart = cart;
      console.log(this.cart.noofItems);
      this.cartId = this.cart.id;
    });
  }
}
