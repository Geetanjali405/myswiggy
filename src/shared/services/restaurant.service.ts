import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry, catchError, throwError } from 'rxjs';
import { Menu } from '../model/menu';
import { Restaurant } from '../model/restaurant';

const baseURL = 'http://localhost:8080';
const getRestaurants: string = `${baseURL}/restaurant`;
const getRestaurantsbyId: string = `${baseURL}/restaurant`;
const getMenu: string = `${baseURL}/menu`;
const getMenubyRes: string = `${baseURL}/menus`;
const addtofav: string = `${baseURL}/addFavouriteRestaurant`;
const removefav: string = `${baseURL}/removefromfav`;
const getfav: string = `${baseURL}/getfavourites`;

@Injectable({
  providedIn: 'root',
})
export class RestaurantService {
  httpOptions = {
    headers: new HttpHeaders({
      Accept: 'text/plain,*/*',
      'Content-type': 'application/json',
    }),
    responseType: 'text' as 'json',
  };

  constructor(private httpclient: HttpClient) {}

  /**
   * @function getRestaurantsbyId get restaurant by their id
   * @param id  The id of the restaurant to be retrieved.
   * @returns Returns an Observable of type Restaurant which will emit the retrieved restaurant object.
   */
  getRestaurantsbyId(id: string): Observable<Restaurant> {
    return this.httpclient
      .get<Restaurant>(`${getRestaurantsbyId}/${id}`)
      .pipe(retry(1), catchError(this.handleError));
  }

  /**
   * @function getRestrauntDetails gets all restaurants
   * @returns Returns an Observable of type Restaurant array which will emit an array of all the
   * restaurants.
   */
  getRestrauntDetails(): Observable<Restaurant[]> {
    return this.httpclient
      .get<Restaurant[]>(`${getRestaurants}`)
      .pipe(retry(1), catchError(this.handleError));
  }

  /**
   * @function getMenuDetails get all menu details.
   * @returns Returns an Observable of type Menu array which will emit an array of all the menu details.
   */
  getMenuDetails(): Observable<Menu[]> {
    return this.httpclient
      .get<Menu[]>(`${getMenu}`)
      .pipe(retry(1), catchError(this.handleError));
  }

  /**
   * @function getMenubyId get food item details
   * @param id The id of the food item to be retrieved.
   * @returns Returns an Observable of type Menu which will emit the retrieved food item object.
   */
  getMenubyId(id: string): Observable<Menu> {
    return this.httpclient
      .get<Menu>(`${getMenu}/${id}`)
      .pipe(retry(1), catchError(this.handleError));
  }

  /**
   * @function getMenuDetailsofRestaurant et Menu of specific restaurant
   * @param restId  The id of the restaurant whose menu details are to be retrieved.
   * @returns Returns an Observable of type Menu array which will emit an array of all the menu details 
   * of the specific restaurant.
   */
  getMenuDetailsofRestaurant(restId: string): Observable<Menu[]> {
    return this.httpclient
      .get<Menu[]>(`${getMenubyRes}/${restId}`)
      .pipe(retry(1), catchError(this.handleError));
  }

  /**
   * @function addToFav Adds a restaurant to favorites of a user.
   * @param id The id of the user who is adding the restaurant to favorites.
   * @param restId  The id of the restaurant which is to be added to favorites.
   * @returns  Returns an Observable of type string which will emit a success message upon successfully 
   * adding the restaurant to favorites.
   */
  addToFav(id: string, restId: string): Observable<string> {
    const headers = new HttpHeaders().set('Response-Type', 'text/plain');
    return this.httpclient.post<string>(
      `${addtofav}/${id}/${restId}`,
      null,
      this.httpOptions
    );
  }

  /**
   * @function removeFromFav Removes a restaurant from favorites of a user.
   * @param id  The id of the user who is removing the restaurant from favorites.
   * @param restId  The id of the restaurant which is to be removed from favorites.
   * @returns Returns an Observable of type string which will emit a success message upon successfully 
   * removing the restaurant from favorites.
   */
  removeFromFav(id: string, restId: string): Observable<string> {
    const headers = new HttpHeaders().set('Response-Type', 'text/plain');
    return this.httpclient.post<string>(
      `${removefav}/${id}/${restId}`,
      null,
      this.httpOptions
    );
  }

  /**
   * @function getFav Retrieves all favorite restaurants of a user.
   * @param id  The id of the user whose favorite restaurants are to be retrieved.
   * @returns  Returns an Observable of type string array which will emit an array of all the favorite 
   * restaurant ids of the user
   */
  getFav(id: string): Observable<string[]> {
    return this.httpclient
      .get<string[]>(`${getfav}/${id}`)
      .pipe(retry(1), catchError(this.handleError));
  }

  //handle any error
  handleError(err: any) {
    return throwError(() => {
      console.log(err);
    });
  }
}
