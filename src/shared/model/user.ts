import { Restaurant } from './restaurant';

export class User {
  id?: string = '';
  userName: string = '';
  password: string = '';
  phone: string = '';
  email: string = '';
  userAddress: string = '';
  userType: string = '';
  firstTimeUser: Boolean = false;
  favouriteRestaurants: Restaurant[] = [];
  status: string = '';
  emailVer: string = '';

  constructor() {}
}
