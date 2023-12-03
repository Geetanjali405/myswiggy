import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Menu } from 'src/shared/model/menu';
import { Restaurant } from 'src/shared/model/restaurant';
import { RestaurantService } from 'src/shared/services/restaurant.service';
import { UserService } from 'src/shared/services/user.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  menuList: Menu[];
  restraunts: Restaurant[];
  filteredProducts: Menu[];
  subscription: Subscription;
  subres: Subscription;
  searchForm: FormGroup;
  filteredRestaurants: Restaurant[];

  public images = [
    {
      image:
        'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/rng/md/carousel/production/b4ff78ecc5b8b66f732dd06228916d65',
    },
    {
      image:
        'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/rng/md/carousel/production/3df4fca020027e89b89c733cdffc4966',
    },
    {
      image:
        'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/rng/md/carousel/production/5dd234f7decdac4b4f71a2ff1408e10f',
    },
    {
      image:
        'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/rng/md/carousel/production/e76b511935016406e6ebc11dd7593387',
    },
    {
      image:
        'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/rng/md/carousel/production/87664acb0f9dd95d10a549bb8190ab27',
    },
    {
      image:
        'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/rng/md/carousel/production/89f3fec702aef5acbb51a6cbc284b3f7',
    },
    {
      image:
        'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/rng/md/carousel/production/8322f6d6df488dc1f5a6674cfe863f0f',
    },
    {
      image:
        'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/rng/md/carousel/production/31f03222ea978aef3b10d386729eb076',
    },
    {
      image:
        'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/rng/md/carousel/production/31f03222ea978aef3b10d386729eb076',
    },
    {
      image:
        'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/rng/md/carousel/production/c170aa4262ec0d191642f42a3a03b4ce',
    },
    {
      image:
        'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/rng/md/carousel/production/0b5ffa32a04d99c1f212d2aacefd5f6f',
    },
    {
      image:
        'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/rng/md/carousel/production/36184033ebef97d27a85fa3af5c1d403',
    },
    {
      image:
        'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/rng/md/carousel/production/d0884e09ef431ee610e54a0bb2dfecd5',
    },
  ];
  constructor(
    private restaurantService:RestaurantService,
    private fb: FormBuilder
  ) {}
  ngOnInit(): void {
    this.subscription = this.restaurantService.getMenuDetails().subscribe(
      (response) => {
        this.menuList = response;
        console.log(response);
      },
      (error) => {
        console.log('Error in fetching menu details', error);
      }
    );
    this.subres = this.restaurantService.getRestrauntDetails().subscribe(
      (response) => {
        this.restraunts = response;
        console.log(response);
      },
      (error) => {
        console.log('Error in fetching restaurant details', error);
      }
    );
    this.searchForm = this.fb.group({
      searchQuery: this.fb.control(''),
    });
    this.searchForm.valueChanges.subscribe(() => {
      this.filterProducts();
      console.log(this.searchForm.value);
    });
  }

  filterProducts() {
    let query = this.searchForm.get('searchQuery')?.value;
    console.log(query);
    if (query.length === 0) {
      this.filteredProducts = [];
      this.filteredRestaurants = [];
    } else if (query.length > 1) {
      this.filteredProducts = this.menuList.filter((item) => {
        return (
          item.name.toLowerCase().includes(query.toLowerCase()) ||
          item.description.toLowerCase().includes(query.toLowerCase()) ||
          item.category.toLowerCase().includes(query.toLowerCase())
        );
      });
      console.log(this.filteredProducts);
  
      this.filteredRestaurants = this.restraunts.filter((restaurant) =>
        restaurant.name.toLowerCase().includes(query.toLowerCase())
      );

      console.log(this.filteredRestaurants);
  
      // If no menu items match the query, show restaurants that match
      if (this.filteredProducts.length === 0) {
        this.filteredRestaurants = this.restraunts.filter((restaurant) =>
          restaurant.name.toLowerCase().includes(query.toLowerCase())
        );
        console.log(this.filteredRestaurants);
      }
    }
  }
}
