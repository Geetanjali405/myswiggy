import { Component, Pipe } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from 'src/shared/services/user.service';

@Component({
  selector: 'app-restaurantdetails',
  templateUrl: './restaurantdetails.component.html',
  styleUrls: ['./restaurantdetails.component.scss'],
})
export class RestaurantdetailsComponent {
  resId: number;
  subscription: Subscription;
  sub: Subscription;
  restaurant: any;
  menuList: any[];
  filtered: any[];
  cloudinaryBaseURL =
    'https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_1024/';
  imgSrc: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.resId = this.route.snapshot.params['id'];

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
}
