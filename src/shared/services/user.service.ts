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

  /**
   * @function addToDelivery Adds an order to the delivery list to track the status of the order.
   * @param cartId The id of the cart which is to be added to the delivery list.
   * @returns Returns an Observable of type DeliveryData which will emit the updated delivery data object
   * after adding the order to delivery list.
   */
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

  /**
   * @function getDelivery
   * @returns  Returns an Observable of type DeliveryData which will emit the delivery data object used
   * to track the status of an order.
   */
  getDelivery(): Observable<DeliveryData> {
    return this.httpclient.get<DeliveryData>(`${getdel}`);
  }

  /**
   * @function updateStatusofOrder Updates the status of an order by its id.
   * @param orderId The id of the order whose status is to be updated.
   * @returns Returns an Observable of type DeliveryData which will emit the updated delivery data to
   * track the status of the order
   */
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

  /**
   * @function getOrderStatuss Retrieves the status of an order by its id.
   * @param orderId The id of the order whose status is to be retrieved.
   * @returns Returns an Observable of type string which will emit the status of the order
   */
  getOrderStatuss(orderId: string): Observable<string> {
    // const headers = new HttpHeaders().set('Response-Type', 'text/plain');
    // console.log(' inside getorderstatus service function');
    // console.log(`${getStatus}/${orderId}`);
    return this.httpclient
      .get<string>(`${getStatus}/${orderId}`, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  /**
   * @function getUserById Retrieves a user by its id.
   * @param userId The id of the user to be retrieved.
   * @returns Returns an Observable of type User which will emit the retrieved user object.
   */
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
