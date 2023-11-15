import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { Restaurant } from '../model/restaurant';
import { User } from '../model/user';
import { Cart } from '../model/cart';

const baseURL = 'http://localhost:8080';
const signUpEndPoint: string = `${baseURL}/signup`;
const signInEndPoint: string = `${baseURL}/signin`;
const getRestaurants: string = `${baseURL}/restaurant`;
const getRestaurantsbyId: string = `${baseURL}/restaurant`;
const getMenu: string = `${baseURL}/menu`;
const getMenubyRes: string = `${baseURL}/menus`;
const addtofav: string = `${baseURL}/addFavouriteRestaurant`;
const getfav: string = `${baseURL}/getfavourites`;
const createuserCart: string = `${baseURL}/cart`;
const showCart:string=`${baseURL}/carts/user`;
const addOrIncreaseItem:string =`${baseURL}/cart`;

@Injectable({
  providedIn: 'root',
})
export class UserService {
  httpOptions = {
    headers: new HttpHeaders({
      Accept: 'text/plain,*/*',
      'Content-type': 'application/json',
    }),
    responseType: 'text' as 'json',
  };
  constructor(private httpclient: HttpClient) {}

  registration(user: User): Observable<any> {
    const header = new HttpHeaders();
    header.set('Content-Type', 'application/json');
    return this.httpclient
      .post<any>(`${signUpEndPoint}`, user, { headers: header })
      .pipe(retry(1), catchError(this.handleError));
  }

  loginUser(user: User): Observable<any> {
    const header = new HttpHeaders();
    header.set('Content-Type', 'application/json');
    return this.httpclient
      .post<any>(`${signInEndPoint}`, user, { headers: header })
      .pipe(retry(1), catchError(this.handleError));
  }

  getRestaurantsbyId(id: string): Observable<any> {
    return this.httpclient
      .get<any>(`${getRestaurantsbyId}/${id}`)
      .pipe(retry(1), catchError(this.handleError));
  }

  getRestrauntDetails(): Observable<any> {
    return this.httpclient
      .get<any>(`${getRestaurants}`)
      .pipe(retry(1), catchError(this.handleError));
  }

  getMenuDetails(): Observable<any> {
    return this.httpclient
      .get<any>(`${getMenu}`)
      .pipe(retry(1), catchError(this.handleError));
  }

  getMenuDetailsofRestaurant(restId: string): Observable<any> {
    return this.httpclient
      .get<any>(`${getMenubyRes}/${restId}`)
      .pipe(retry(1), catchError(this.handleError));
  }

  addToFav(id: string, restId: string): Observable<string> {
    const headers = new HttpHeaders().set('Response-Type', 'text/plain');
    // console.log(`${addtofav}/${id}/${restId}`);
    return this.httpclient.post<string>(
      `${addtofav}/${id}/${restId}`,
      null,
      this.httpOptions
    );
  }

  getFav(id: string): Observable<any> {
    return this.httpclient
      .get<any>(`${getfav}/${id}`)
      .pipe(retry(1), catchError(this.handleError));
  }

  createCart(userId: string): Observable<Cart> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    console.log(userId);
    const body = { userId: userId };
    return this.httpclient.post<Cart>(`${createuserCart}`, body, httpOptions);
  }

  getCart(userId: string): Observable<Cart> {
    console.warn(`${showCart}/${userId}`);
    return this.httpclient.get<Cart>(`${showCart}/${userId}`);
  }

  handleError(err: any) {
    return throwError(() => {
      console.log(err);
    });
  }
}
