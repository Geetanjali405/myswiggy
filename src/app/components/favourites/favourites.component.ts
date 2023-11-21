import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { RestaurantService } from 'src/shared/services/restaurant.service';

import { UserService } from 'src/shared/services/user.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.scss'],
})
export class FavouritesComponent implements OnInit {
  subscription: Subscription;
  favList: string[];
  id: string;
  restaurantList = [];
  constructor(
    private router: Router,
    private restaurantService: RestaurantService,
    private userService: UserService
  ) {}
  ngOnInit(): void {
    this.id = localStorage.getItem('id');
    this.getFav(this.id);
  }

  getFav(id: string) {
    this.restaurantService.getFav(this.id).subscribe({
      next: (response) => {
        this.favList = response;
        console.log(response);
        this.favList.forEach((fav) => {
          this.restaurantService.getRestaurantsbyId(fav).subscribe({
            next: (restaurant) => {
              // console.warn(restaurant);
              this.restaurantList.push(restaurant);
              // console.warn(this.restaurantList);
            },
            error: (error) => {
              console.log('Error in fetching restaurant details', error);
            },
          });
        });
      },
      error: (error) => {
        console.log('Error in fetching favorite restaurants', error);
      },
    });
  }
}
