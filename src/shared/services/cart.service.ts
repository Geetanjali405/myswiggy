import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, retry, throwError } from 'rxjs';
import { Cart } from '../model/cart';

const baseURL = 'http://localhost:8080';
const createuserCart: string = `${baseURL}/cart`;
const showCart: string = `${baseURL}/carts/user`;
const addOrIncreaseItem: string = `${baseURL}/cart`;
const decItem: string = `${baseURL}/cartdec`;
const remoItem: string = `${baseURL}/delete`;
const delCart: string = `${baseURL}/deletecart`;

@Injectable({
  providedIn: 'root',
})
export class CartService {
  httpOptions = {
    headers: new HttpHeaders({
      Accept: 'text/plain,*/*',
      'Content-type': 'application/json',
    }),
    responseType: 'text' as 'json',
  };

  constructor(private httpclient: HttpClient) {}

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
  deleteCart(userId: string): Observable<string> {
    console.warn(`${showCart}/${userId}`);
    return this.httpclient
      .delete<string>(`${delCart}/${userId}`, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  //add item in cart
  addItemToCart(userId: string, itemId: string): Observable<Cart> {
    return this.httpclient.put<Cart>(
      `${addOrIncreaseItem}/${userId}/${itemId}`,
      {},
      this.httpOptions
    );
  }

  //decrease item from cart
  decreaseItem(userId: string, itemId: string): Observable<Cart> {
    return this.httpclient
      .put<Cart>(`${decItem}/${userId}/${itemId}`, null);
  }

  //remove item from cart
  removeItem(userId: string, itemId: string): Observable<Cart> {
    return this.httpclient.delete<Cart>(`${remoItem}/${userId}/${itemId}`);
  }

  //handle any error
  handleError(err: any) {
    return throwError(() => {
      console.log(err);
    });
  }
}
