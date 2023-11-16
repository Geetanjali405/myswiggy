import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { BehaviorSubject, catchError, Observable, retry, Subject, throwError } from 'rxjs';
import { Restaurant } from '../model/restaurant';
import { User } from '../model/user';
import { Cart } from '../model/cart';
import { DeliveryData } from '../model/delivery';

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
const showCart: string = `${baseURL}/carts/user`;
const addOrIncreaseItem: string = `${baseURL}/cart`;
const decItem: string = `${baseURL}/cartdec`;
const remoItem: string = `${baseURL}/delete`;
const adddel: string = `${baseURL}/delivery`;
const getdel: string = `${baseURL}/delivery/6554e024a594227362c3e04d`;
const updateStatus: string = `${baseURL}/delivery`;
const getStatus: string = `${baseURL}/getstatus`;

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


  // deliveryBS$ = this.deliveryBS.asObservable();

  // orderStatusBS: BehaviorSubject<string> = new BehaviorSubject('');
  // orderStatusBS$ = this.orderStatusBS.asObservable();

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
    const body = { userId: userId };
    return this.httpclient.post<Cart>(`${createuserCart}`, body, httpOptions);
  }

  getCart(userId: string): Observable<Cart> {
    console.warn(`${showCart}/${userId}`);
    return this.httpclient.get<Cart>(`${showCart}/${userId}`);
  }

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

  removeItem(userId: string, itemId: string): Observable<Cart> {
    return this.httpclient.delete<Cart>(`${remoItem}/${userId}/${itemId}`).pipe(
      catchError((error) => {
        console.log('Error in removing item: ' + error);
        return throwError('Error in removing item. Please try again later.');
      })
    );
  }

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

  getOrderStatuss(orderId: string): Observable<any> {
    // const headers = new HttpHeaders().set('Response-Type', 'text/plain');
    // console.log(' inside getorderstatus service function');
    // console.log(`${getStatus}/${orderId}`);
    return this.httpclient
      .get<any>(`${getStatus}/${orderId}`, this.httpOptions)
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

  handleError(err: any) {
    return throwError(() => {
      console.log(err);
    });
  }
}
