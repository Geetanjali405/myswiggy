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
  providedIn: 'root'
})
export class RestaurantService {
  httpOptions = {
    headers: new HttpHeaders({
      Accept: 'text/plain,*/*',
      'Content-type': 'application/json',
    }),
    responseType: 'text' as 'json',
  };

  constructor(private httpclient: HttpClient) { }

  
  //get restaurant by their id
  getRestaurantsbyId(id: string): Observable<Restaurant> {
    return this.httpclient
      .get<Restaurant>(`${getRestaurantsbyId}/${id}`)
      .pipe(retry(1), catchError(this.handleError));
  }

  //get all restaurants
  getRestrauntDetails(): Observable<Restaurant[]> {
    return this.httpclient
      .get<Restaurant[]>(`${getRestaurants}`)
      .pipe(retry(1), catchError(this.handleError));
  }

  //get all menu details.
  getMenuDetails(): Observable<Menu[]> {
    return this.httpclient
      .get<Menu[]>(`${getMenu}`)
      .pipe(retry(1), catchError(this.handleError));
  }

  //get food item details
  getMenubyId(id: string): Observable<Menu> {
    return this.httpclient
      .get<Menu>(`${getMenu}/${id}`)
      .pipe(retry(1), catchError(this.handleError));
  }

  //get Menu of specific restaurant
  getMenuDetailsofRestaurant(restId: string): Observable<Menu[]> {
    return this.httpclient
      .get<Menu[]>(`${getMenubyRes}/${restId}`)
      .pipe(retry(1), catchError(this.handleError));
  }

  //add restraunt to favourites
  addToFav(id: string, restId: string): Observable<string> {
    const headers = new HttpHeaders().set('Response-Type', 'text/plain');
    // console.log(`${addtofav}/${id}/${restId}`);
    return this.httpclient.post<string>(
      `${addtofav}/${id}/${restId}`,
      null,
      this.httpOptions
    );
  }

  //remove from favourites
  removeFromFav(id: string, restId: string): Observable<string> {
    const headers = new HttpHeaders().set('Response-Type', 'text/plain');
    return this.httpclient.post<string>(
      `${removefav}/${id}/${restId}`,
      null,
      this.httpOptions
    );
  }

  //get favourites restaurant array
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
