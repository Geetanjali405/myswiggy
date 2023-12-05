import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { UserService } from 'src/shared/services/user.service';
import { ButtonModule } from 'primeng/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Restaurant } from 'src/shared/model/restaurant';
import { RestaurantService } from 'src/shared/services/restaurant.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  @Input() res: Restaurant;
  imgSrc: string;
  id: string;
  isFav: boolean = false;
  favarr: string[];
  cloudinaryBaseURL =
    'https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_1024/';

  constructor(
    private userService: UserService,
    private restaurantService: RestaurantService,
    private snackBar: MatSnackBar
  ) {}
  fav = null;
  ngOnInit() {
    this.id = localStorage.getItem('id');

    this.getFav(this.id);

    this.imgSrc = `${this.cloudinaryBaseURL}${this.res.cloudinaryImageId}`;
  }

  /**
   * Retrieves the favorite items for a user with the specified ID.
   * @param {string} id - The ID of the user to retrieve favorite items for.
   * @returns {void} - This function does not return a value, but sets the `favarr`
   *                    property of the current object and logs the result to the console.
   */
  getFav(id: string) {
    this.restaurantService.getFav(id).subscribe({
      next: (data) => {
        this.favarr = data;
      },
      error: (er) => {
        console.log(er);
      },
    });
  }

  /**
   * Adds a restaurant with the specified ID to the favorite items for the user with the specified ID.
   * @param  id - The ID of the user to add the favorite item to.
   * @param  restId - The ID of the restaurant to add to favorites.
   * @returns {void} - This function does not return a value, but logs the result to the console, opens a snack bar with a message,  and calls the `getFav` function to update the favorite items list.
   */
  addToFav(id: string, restId: string) {
    this.restaurantService.addToFav(id, restId).subscribe({
      next: (res) => {
        this.snackBar.open('Added to favourites !!', 'OK', {
          duration: 3000,
        });
        this.getFav(id);
      },
      error: (er) => {
        console.warn(er);
      },
    });
  }

  /**
   * @function Removes a restaurant with the specified ID from the favorite items for the user with the specified ID.
   * @param {string} id - The ID of the user to remove the favorite item from.
   * @param {string} restId - The ID of the restaurant to remove from favorites.
   * @returns {void} - This function does not return a value, but logs the result to the console, opens a snack bar with a message,and calls the `getFav` function to update the favorite items list.
   */
  removeFromFav(id: string, restId: string) {
    this.restaurantService.removeFromFav(id, restId).subscribe({
      next: (res) => {
        this.snackBar.open('Removed from favourites !!', 'OK', {
          duration: 3000,
        });
        this.getFav(id);
      },
      error: (er) => {
        console.warn(er);
      },
    });
  }

  /**
   *
   * @function issFav Checks whether a restaurant with the specified ID is in the list of favorite items.
   * @param {string} resId - The ID of the restaurant to check.
   * @returns {boolean} - `true` if the restaurant is in the list of favorite items, `false` otherwise.
   */
  issFav(resId: string): boolean {
    if (this.favarr && this.favarr.includes(resId)) {
      return true;
    } else {
      return false;
    }
  }
}
