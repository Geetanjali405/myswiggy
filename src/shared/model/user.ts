import { Restaurant } from './restaurant';

export class User {
  id: String = '';
  userName: String = '';
  password: String = '';
  phone: String = '';
  email: String = '';
  userAddress: String = '';
  userType: String = '';
  firstTimeUser: Boolean = false;
  favouriteRestaurants: Restaurant[] = [];

  constructor() {}
}
