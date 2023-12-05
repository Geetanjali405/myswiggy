import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { RestaurantService } from 'src/shared/services/restaurant.service';

import { UserService } from 'src/shared/services/user.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.scss'],
})
export class FavouritesComponent implements OnInit {
  bangaloreRestaurants: string[] = [
    'GOWHEY- HEALTHY DESSERT COMPANY',
    'Pancakes by Knight Bite',
    'Darjeeling Hot Momos',
    'Minus 30',
    "Waffl'd",
    'Champaran Meat House',
    'Sindhoora Gardenia',
    'Halwai sweets and snacks',
    'Saanvika Foods',
    'Pallavi Restaurant (Authentic taste from Gulbarga)',
    'No Sugar Please, Sweets & Juices',
    'Udupi Kitchen',
    'Kobe Sizzlers',
    'Samosa Central',
    '1947 Restaurant',
    'Pizza House',
    'Zed The Baker',
    'Poha On Wheels',
    'Salt - Indian Restaurant Bar & Grill',
    'Healthy Binge',
    'Kolkata Famous Katti Rolls',
    'Zoroy Luxury Chocolates',
    "Haldiram's Restaurant",
    'Halli Mane',
    'Drip The Cafe Bar',
    'Biryani @Rs.99 Only',
    'Sinful Desserts',
    'Shawarma Indiah',
    '3 Mangos',
    'Rolls 21',
    'My Bowl',
    'Upahara Darshini',
    'Halli Mane Donne Biriyani',
    'Sampradaya Restaurant',
    'Kabab King',
    'Absolute Momo Cafe',
  ];
  hyderabadRestaurants: string[] = [
    'Al Madina Chicken Haleem',
    'Lucky Multicuisine Restaurant',
    'Pakka Local',
    'The Sandwich Story',
    'Sri Raghavendra Tiffins',
    'Louis Burger',
    'Chung Hua Restaurant',
    "POP O' Bob - Bubble Tea Cafe",
    'Biryaari',
    'Puliyogare Palace',
    'Nellore Ruchulu',
    'Chaayos Chai+Snacks=Relax',
    'JUST CHICKEN',
    '9 Town Pizza',
    'Wisphot - Rolls &amp; Fries',
    'BLR Food Kourt',
    'ATH - All Things Healthy!',
    'Rk Sweets and Juices',
    'Rajasthan Dhaba',
    'Buffalo Wild Wings',
    'PHEBE FRIED CHICKEN',
    'Qaffeine Coffee',
    'Dhaba Chef',
    'Roosterville',
    'Five Star Chicken &amp; Koli Hut',
    'The Milkshake Shop',
    'Shawarma Smack',
    'Lassi &amp; Falooda Co',
    'Platform 65',
    'Mozzarella - The Pizza House',
    'THE HYDERABAD CHICKEN HALEEM',
    'Kulfi Nation',
    'Wow! Chicken By Wow! Momo',
    'Milk Shake House',
    'Amaravathi Restaurant',
    'Fruit Lust',
    'Fried Wings',
    'Senoritas Mexican kitchen by Little Italy',
    'Soul Rasa',
    'Pista House Tea',
    'Kodi Kura Chitti Gaare',
    'Sri Balaji Family Dhaba',
    'Vivaha Bhojanambu',
    'Arabian Mandi',
    'Chakhh De Punjab',
    'Funchick Fried Chicken',
    'Hotel SVM Grand',
  ];
  patnaAmericanRestaurants: string[] = [
    'Grill Daddy Restaurant',
    'American Fried Chicken',
    'Sizzle n Fizz',
    'Cafe Hideout Patna',
    'Quick Bite',
    'Sizzle n Fizz',
    'Dodos Pizza & Burger',
    'Bamboo Delight - Restaurant',
    'The Saffron Tree - Fine Dine Restaurant',
    'Anand Family Restaurant',
    'Paradise Biryani',
    'Royal Treat Family Restaurant & Coffee Shop',
    'Zaika Family Restaurant',
    'Parasbari Family Restaurant',
    'Al-Baik',
    'Daawat Restaurant',
    'Fusion Kitchen',
    'Royal Treat Family Restaurant & Coffee Shop',
    'The Saffron Tree - Fine Dine Restaurant',
    'Hakka Biryani Point',
    'The Eatery - Chinese',
    'Famous Bakery',
    'Bake Hut',
    'The Pastry Shop',
    'The Bake House',
    'Nathus Bakery',
    'Cocoberry',
    'Paisa Vasool Cafe',
    'Container Kitchen',
    'Berrilicious',
    'Jug Mug Thela',
    'Bhikhari Thandi Chai',
    'Cafe Hideout Patna',
    'Raj Rasoi',
    'Pind Balluchi',
    'Bansal Sweets',
    'Sattu and Bati',
    'The Potbelly Rooftop Cafe',
    'Gharoa',
    'Baba Dhaba Restaurant',
    'Ammas Kitchen',
    'Birjubehera Litti & Chokha',
    'Bake Hut',
    'Taste of Biryani',
    'Daawat Restaurant',
    'Royal Treat Family Restaurant & Coffee Shop',
    'Paradise Biryani',
    'New Taste Of Biryani',
    'Jaisons Biryani',
    'Ghuroba Restro Cafe',
    'Cafe Hideout Patna',
    'LITz Cafe',
    'Bistro Treats',
    'Paisley Cafe',
    'Sams Cafe',
    'Hot Breads & Cafe',
    'Cafe Royale',
    'Krishna Chaat Bhandar',
    'Lakshmi Chaat House',
    'Foodius Chatkara',
    'Keventers',
    'Sandeep Chaat Bhandar',
    'Daawat Restaurant',
    'Fusion Kitchen',
    'Hakka Biryani Point',
    'The Eatery - Chinese',
    'Chopstick Food Court',
  ];
  subscription: Subscription;
  favList: string[];
  id: string;
  selLoc: string = 'Hyderabad';
  restaurantList = [];
  constructor(
    private router: Router,
    private restaurantService: RestaurantService,
    private userService: UserService
  ) {}
  ngOnInit(): void {
    this.id = localStorage.getItem('id');
    this.getFav(this.id);
  }

  getFav(id: string) {
    this.restaurantService.getFav(this.id).subscribe({
      next: (response) => {
        this.favList = response;
        
        this.favList.forEach((fav) => {
          this.restaurantService.getRestaurantsbyId(fav).subscribe({
            next: (restaurant) => {
              // console.warn(restaurant);
              this.restaurantList.push(restaurant);
              // console.warn(this.restaurantList);
            },
            error: (error) => {
              console.log('Error in fetching restaurant details', error);
            },
          });
        });
      },
      error: (error) => {
        console.log('Error in fetching favorite restaurants', error);
      },
    });
  }
}
