import { Component ,AfterViewInit, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from 'src/shared/services/user.service';
import * as $ from "jquery";

@Component({
  selector: 'app-restaurantdetails',
  templateUrl: './restaurantdetails.component.html',
  styleUrls: ['./restaurantdetails.component.scss'],
})
  
export class RestaurantdetailsComponent implements OnInit{
  resId: number;
  subscription: Subscription;
  sub: Subscription;
  restaurant: any;
  menuList: any[];
  filtered: any[];
  userId: string;
  cloudinaryBaseURL =
    'https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_1024/';
  imgSrc: string;
  layout: string = 'list';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.resId = this.route.snapshot.params['id'];
    this.userId = localStorage.getItem('id');
    console.log('line 31');
    console.log(this.userId);
    // console.log(this.resId);

    this.subscription = this.userService
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

    this.sub = this.userService
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
    // console.log(menuId);
    // console.log(this.userId);
    this.userService.addItemToCart(this.userId, menuId).subscribe(
      (data) => {
        console.log('Item added to cart successfully!');
      },
      (error) => {
        console.error('Error while adding item to cart: ');
        console.error(error);
      }
    );
  }


}
