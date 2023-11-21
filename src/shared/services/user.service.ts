import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import {
  BehaviorSubject,
  catchError,
  Observable,
  retry,
  Subject,
  throwError,
} from 'rxjs';
import { Restaurant } from '../model/restaurant';
import { User } from '../model/user';
import { Cart } from '../model/cart';
import { DeliveryData } from '../model/delivery';
import { Menu } from '../model/menu';

const baseURL = 'http://localhost:8080';
const signUpEndPoint: string = `${baseURL}/signup`;
const signInEndPoint: string = `${baseURL}/signin`;
const getRestaurants: string = `${baseURL}/restaurant`;
const getRestaurantsbyId: string = `${baseURL}/restaurant`;
const getMenu: string = `${baseURL}/menu`;
const getMenubyRes: string = `${baseURL}/menus`;
const addtofav: string = `${baseURL}/addFavouriteRestaurant`;
const removefav: string = `${baseURL}/removefromfav`;
const getfav: string = `${baseURL}/getfavourites`;
const createuserCart: string = `${baseURL}/cart`;
const showCart: string = `${baseURL}/carts/user`;
const addOrIncreaseItem: string = `${baseURL}/cart`;
const decItem: string = `${baseURL}/cartdec`;
const remoItem: string = `${baseURL}/delete`;
const adddel: string = `${baseURL}/delivery`;
const getdel: string = `${baseURL}/delivery/6554e024a594227362c3e04d`;
const updateStatus: string = `${baseURL}/delivery`;
const getStatus: string = `${baseURL}/getstatus`;
const delCart: string = `${baseURL}/deletecart`;
const getUser: string = `${baseURL}/user`;

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
  private user$ = new BehaviorSubject<{ loggedIn: boolean }>({
    loggedIn: false,
  });

  setUser(loggedIn: boolean) {
    this.user$.next({ loggedIn });
  }

  getUser() {
    return this.user$.asObservable();
  }

  constructor(private httpclient: HttpClient) {
    this.getDelivery();
  }

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
    // console.log(`${addtofav}/${id}/${restId}`);
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

  //create cart for user
  createCart(userId: string): Observable<Cart> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    const body = { userId: userId };
    return this.httpclient.post<Cart>(`${createuserCart}`, body, httpOptions);
  }

  //get cart details
  getCart(userId: string): Observable<Cart> {
    console.warn(`${showCart}/${userId}`);
    return this.httpclient.get<Cart>(`${showCart}/${userId}`);
  }

  //delete cart
  deleteCart(userId: string): Observable<String> {
    console.warn(`${showCart}/${userId}`);
    return this.httpclient
      .delete<any>(`${delCart}/${userId}`, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  //add item in cart
  addItemToCart(userId: string, itemId: string): Observable<Cart> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.httpclient.put<Cart>(
      `${addOrIncreaseItem}/${userId}/${itemId}`,
      {},
      httpOptions
    );
  }

  //decrease item from cart
  decreaseItem(userId: string, itemId: string): Observable<Cart> {
    return this.httpclient
      .put<Cart>(`${decItem}/${userId}/${itemId}`, null)
      .pipe(
        catchError((error) => {
          console.log('Error in decreasing item: ' + error);
          return throwError(
            'Error in decreasing item. Please try again later.'
          );
        })
      );
  }

  //remove item from cart
  removeItem(userId: string, itemId: string): Observable<Cart> {
    return this.httpclient.delete<Cart>(`${remoItem}/${userId}/${itemId}`).pipe(
      catchError((error) => {
        console.log('Error in removing item: ' + error);
        return throwError('Error in removing item. Please try again later.');
      })
    );
  }

  //add order to delivery
  addToDelivery(cartId: string): Observable<DeliveryData> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.httpclient.post<DeliveryData>(
      `${adddel}/${cartId}`,
      null,
      httpOptions
    );
  }

  //get delivery id on the delivery side
  getDelivery(): Observable<DeliveryData> {
    return this.httpclient.get<DeliveryData>(`${getdel}`);
  }

  // getDelivery() {
  //   this.httpclient.get<DeliveryData>(`${getdel}`).subscribe({
  //     next: (res) => {
  //       this.deliveryBS.next(res);
  //       this.getOrderStatuss();
  //     },
  //   });
  // }

  //update status of order from accepted->processing->delivered
  updateStatusofOrder(orderId: string): Observable<DeliveryData> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.httpclient.post<DeliveryData>(
      `${updateStatus}/${orderId}`,
      null,
      httpOptions
    );
  }

  //get current order status of user
  getOrderStatuss(orderId: string): Observable<string> {
    // const headers = new HttpHeaders().set('Response-Type', 'text/plain');
    // console.log(' inside getorderstatus service function');
    // console.log(`${getStatus}/${orderId}`);
    return this.httpclient
      .get<string>(`${getStatus}/${orderId}`, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  // getOrderStatuss() {
  //   // const headers = new HttpHeaders().set('Response-Type', 'text/plain');
  //   // console.log(' inside getorderstatus service function');
  //   // console.log(`${getStatus}/${orderId}`);
  //   const userId = localStorage.getItem('id');
  //   this.getCart(userId).subscribe({
  //     next: (res) => {
  //       const orderId = res.id;
  //       this.httpclient
  //         .get<any>(`${getStatus}/${orderId}`, this.httpOptions)
  //         .pipe(retry(1), catchError(this.handleError))
  //         .subscribe({
  //           next: (res) => {
  //             console.warn("incoming response from user service getorderstatus");
  //             console.warn(`${getStatus}/${orderId}`);
  //             console.warn(res);
  //             this.orderStatusBS.next(res);
  //           },
  //           error: (er) => {
  //             console.error(er);
  //           },
  //         });
  //     },
  //   });
  // }

  //get user by id
  getUserById(userId: string): Observable<any> {
    return this.httpclient
      .get<any>(`${getUser}/${userId}`, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  //handle any error
  handleError(err: any) {
    return throwError(() => {
      console.log(err);
    });
  }
}
