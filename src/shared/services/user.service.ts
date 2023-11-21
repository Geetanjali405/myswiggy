import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import {
  BehaviorSubject,
  catchError,
  Observable,
  retry,
  throwError,
} from 'rxjs';

import { User } from '../model/user';
import { DeliveryData } from '../model/delivery';

const baseURL = 'http://localhost:8080';
const signUpEndPoint: string = `${baseURL}/signup`;
const signInEndPoint: string = `${baseURL}/signin`;

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

  registration(user: User): Observable<User> {
    const header = new HttpHeaders();
    header.set('Content-Type', 'application/json');
    return this.httpclient
      .post<User>(`${signUpEndPoint}`, user, { headers: header })
      .pipe(retry(1), catchError(this.handleError));
  }

  loginUser(user: User): Observable<any> {
    const header = new HttpHeaders();
    header.set('Content-Type', 'application/json');

    return this.httpclient
      .post<any>(`${signInEndPoint}`, user, { headers: header })
      .pipe(retry(1), catchError(this.handleError));
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
  getUserById(userId: string): Observable<User> {
    return this.httpclient
      .get<User>(`${getUser}/${userId}`, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  //handle any error
  handleError(err: any) {
    return throwError(() => {
      console.log(err);
    });
  }
}
