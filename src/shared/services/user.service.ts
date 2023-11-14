import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { Restaurant } from '../model/restaurant';
import { User } from '../model/user';

const baseURL = 'http://localhost:8080';
const signUpEndPoint: string = `${baseURL}/signup`;
const signInEndPoint: string = `${baseURL}/signin`;
const getRestaurants: string = `${baseURL}/restaurant`;
const getRestaurantsbyId: string = `${baseURL}/restaurant`;
const getMenu: string = `${baseURL}/menu`;
const getMenubyRes: string = `${baseURL}/menus`;

@Injectable({
  providedIn: 'root',
})
export class UserService {
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

  getMenuDetailsofRestaurant(restId:string): Observable<any> {
    return this.httpclient
      .get<any>(`${getMenubyRes}/${restId}`)
      .pipe(retry(1), catchError(this.handleError));
  }

  handleError(err: any) {
    return throwError(() => {
      console.log(err);
    });
  }
}
