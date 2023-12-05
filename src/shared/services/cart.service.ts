import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, retry, throwError } from 'rxjs';
import { Cart } from '../model/cart';

const baseURL = 'http://localhost:8080';
const createuserCart: string = `${baseURL}/cart`;
const showCart: string = `${baseURL}/carts/user`;
const addOrIncreaseItem: string = `${baseURL}/cart`;
const decItem: string = `${baseURL}/cartdec`;
const remoItem: string = `${baseURL}/delete`;
const delCart: string = `${baseURL}/deletecart`;
const addtofood: string = `${baseURL}/addfood`;

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

  /**
   * @function createCart  creates cart for user
   * @param userId  The id of the user for whom the cart is created.
   * @returns Returns an Observable of type Cart which will emit the newly created cart object.
   */
  createCart(userId: string): Observable<Cart> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    const body = { userId: userId };
    return this.httpclient.post<Cart>(`${createuserCart}`, body, httpOptions);
  }

  /**
   * @function getCart Retrieves the cart of a given user id.
   * @param userId The id of the user whose cart is to be retrieved.
   * @returns  Returns an Observable of type Cart which will emit the retrieved cart object.
   */
  getCart(userId: string): Observable<Cart> {
    console.warn(`${showCart}/${userId}`);
    return this.httpclient.get<Cart>(`${showCart}/${userId}`);
  }

  /**
   * @function deleteCart Deletes the cart of a given user id.
   * @param userId The id of the user whose cart is to be deleted.
   * @returns Returns an Observable of type string which will emit a success message upon successful 
   * deletion of the cart
   */
  deleteCart(userId: string): Observable<string> {
    console.warn(`${showCart}/${userId}`);
    return this.httpclient
      .delete<string>(`${delCart}/${userId}`, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  /**
   * @function addIteminCart Adds an item to the cart of a given user id.
   * @param userId  The id of the user whose cart is to be modified.
   * @param itemId The id of the item to be added to the cart.
   * @returns  Returns an Observable of type Cart which will emit the updated cart object after adding 
   * the item.
   */
  addItemToCart(userId: string, itemId: string): Observable<Cart> {
    return this.httpclient.put<Cart>(
      `${addOrIncreaseItem}/${userId}/${itemId}`,
      {},
      this.httpOptions
    );
  }

  /**
   * @function decreaseItem Decreases the quantity of an item in the cart of a given user id.
   * @param userId The id of the user whose cart is to be modified.
   * @param itemId The id of the item whose quantity is to be decreased.
   * @returns Returns an Observable of type Cart which will emit the updated cart object after decreasing 
   * the quantity of the item
   */
  decreaseItem(userId: string, itemId: string): Observable<Cart> {
    return this.httpclient
      .put<Cart>(`${decItem}/${userId}/${itemId}`, null);
  }

  /**
   * @function remoItem Removes an item from the cart of a given user id.
   * @param userId  The id of the user whose cart is to be modified.
   * @param itemId  The id of the item to be removed from the cart.
   * @returns Returns an Observable of type Cart which will emit the updated cart object after removing 
   * the item from the cart. 
   */
  removeItem(userId: string, itemId: string): Observable<Cart> {
    return this.httpclient.delete<Cart>(`${remoItem}/${userId}/${itemId}`);
  }

  addtofood(id: string, foodid: string): Observable<any> {

    const headers = new HttpHeaders().set('Response-Type', 'text/plain');
    return this.httpclient.post<any>(
      `${baseURL}/addfood/${id}/${foodid}`,
      null,
      this.httpOptions
    ).pipe(
      catchError(error => {
        console.error('Error in addtofood: ', error);
        return of(null); 
      })
    );
  }


  //handles any error
  handleError(err: any) {
    return throwError(() => {
      console.log(err);
    });
  }
}
