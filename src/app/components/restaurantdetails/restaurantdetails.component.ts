import { Component, AfterViewInit, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from 'src/shared/services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Menu } from 'src/shared/model/menu';
import { Restaurant } from 'src/shared/model/restaurant';
import { CartService } from 'src/shared/services/cart.service';
import { RestaurantService } from 'src/shared/services/restaurant.service';

@Component({
  selector: 'app-restaurantdetails',
  templateUrl: './restaurantdetails.component.html',
  styleUrls: ['./restaurantdetails.component.scss'],
})
export class RestaurantdetailsComponent implements OnInit {
  resId: number;
  subscription: Subscription;
  sub: Subscription;
  restaurant: Restaurant;
  menuList: Menu[];
  filtered: Menu[];
  userId: string;
  imageSrc: string;

  cloudinaryBaseURL =
    'https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_1024/';
  imgSrc: string;
  layout: string = 'list';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private cartService: CartService,
    private restaurantService:RestaurantService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.resId = this.route.snapshot.params['id'];
    this.userId = localStorage.getItem('id');
    console.log('line 31');
    console.log(this.userId);
    // console.log(this.resId);

    this.subscription = this.restaurantService
      .getRestaurantsbyId(this.resId.toString())
      .subscribe(
        (response) => {
          this.restaurant = response;
          this.imgSrc = `${this.cloudinaryBaseURL}${this.restaurant.cloudinaryImageId}`;
          console.log(response);
        },
        (error) => {
          console.log('Error in fetching restaurant details by id', error);
        }
      );

    this.sub = this.restaurantService
      .getMenuDetailsofRestaurant(this.resId.toString())
      .subscribe(
        (response) => {
          this.menuList = response;
          this.filtered = response;
          console.log(response);
        },
        (error) => {
          console.log('Error in fetching menudetails of restaurant', error);
        }
      );

    document.querySelectorAll('.add-to-cart').forEach((button) => {
      button.addEventListener('click', (e) => {
        button.classList.toggle('added');
      });
    });
  }

  toggleVegFilter() {
    this.filtered = this.menuList.filter((item) => item.isVeg === '1');
  }
  toggleNonVegFilter() {
    this.filtered = this.menuList.filter((item) => item.isVeg === '0');
  }

  addIteminCart(menuId: string) {
    this.cartService.addItemToCart(this.userId, menuId).subscribe(
      (data) => {
        console.log('Item added to cart successfully!');
        this.snackBar.open('Item added to cart', 'OK', {
          duration: 3000,
        });
        
      },
      (error) => {
        console.error('Error while adding item to cart: ');
        console.error(error);
      }
    );
  }
}
