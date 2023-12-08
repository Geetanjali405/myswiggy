import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarComponent } from 'src/shared/sharedcomp/navbar/navbar.component';
import { CarouselModule } from 'primeng/carousel';
import { Subscription } from 'rxjs';
import { UserService } from 'src/shared/services/user.service';
import * as $ from 'jquery';
import { Restaurant } from 'src/shared/model/restaurant';
import { User } from 'src/shared/model/user';
import { RestaurantService } from 'src/shared/services/restaurant.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
 
  restaurantList: Restaurant[];
  subscription: Subscription;
  isAscending: boolean;
  userData: User;
  images: string[];
  imagess: string[];
  userId: string;
  constructor(
    private router: Router,
    private userService: UserService,
    private restaurantService: RestaurantService
  ) {}

  ngOnInit(): void {
    console.warn(localStorage.getItem('id'));
    this.userId = localStorage.getItem('id');
    const userString = localStorage.getItem('user');
    this.userData = JSON.parse(userString);
    this.subscription = this.restaurantService.getRestrauntDetails().subscribe(
      (response) => {
        this.restaurantList = response;
      },
      (error) => {
        console.log('Error in fetching restaurant details', error);
      }
    );
    // this.images=this.us
    this.userService.getoffer(this.userId).subscribe(
      (response) => {
        this.images = response;
      },
      (error) => {
        console.error(error);
      }
    );
    this.userService.getcate(this.userId).subscribe(
      (response) => {
        this.imagess = response;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  toggleSortByRating(): void {
    const isAscending =
      this.isAscending === undefined ? true : this.isAscending;
    this.restaurantList.sort((a, b) => {
      const ratingA = parseFloat(a.avgRatingString);
      const ratingB = parseFloat(b.avgRatingString);
      if (isAscending) {
        return ratingA - ratingB;
      } else {
        return ratingB - ratingA;
      }
    });
    this.isAscending = !isAscending;
  }

  clearfilter() {
    this.subscription = this.restaurantService.getRestrauntDetails().subscribe(
      (response) => {
        this.restaurantList = response;
      },
      (error) => {
        console.log('Error in fetching restaurant details', error);
      }
    );
  }

  toggleSortBynoofRatings(): void {
    const isAscending =
      this.isAscending === undefined ? true : this.isAscending;
    this.restaurantList.sort((a, b) => {
      const ratingA = parseFloat(a.totalRatingsString);
      const ratingB = parseFloat(b.totalRatingsString);
      if (isAscending) {
        return ratingA - ratingB;
      } else {
        return ratingB - ratingA;
      }
    });
    this.isAscending = !isAscending;
  }
}
