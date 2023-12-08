import { Component, AfterViewInit, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from 'src/shared/services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Menu } from 'src/shared/model/menu';
import { Restaurant } from 'src/shared/model/restaurant';
import { CartService } from 'src/shared/services/cart.service';
import { RestaurantService } from 'src/shared/services/restaurant.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { Cart } from 'src/shared/model/cart';
import { Location } from '@angular/common';

@Component({
  selector: 'app-restaurantdetails',
  templateUrl: './restaurantdetails.component.html',
  styleUrls: ['./restaurantdetails.component.scss'],
})
export class RestaurantdetailsComponent implements OnInit {
  resId: number;
  subscription: Subscription;
  sub: Subscription;
  restaurant: Restaurant;
  menuList: Menu[];
  filtered: Menu[];
  userId: string;
  imageSrc: string;

  cloudinaryBaseURL =
    'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_208,h_208,c_fit/';
  imgSrc: string;
  layout: string = 'list';
  searchForm: FormGroup;
  reviewText = '';
  rating = '';
  reviews: any[];
  cart: Cart;
  cartId: string;

  constructor(
    private route: ActivatedRoute,
    private cartService: CartService,
    private restaurantService: RestaurantService,
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
    private location: Location,
    private offcanvasService: NgbOffcanvas,
    private httpclient: HttpClient
  ) {}
  ngOnInit(): void {
    this.resId = this.route.snapshot.params['id'];
    this.userId = localStorage.getItem('id');
    this.getcartid();

    this.searchForm = this.fb.group({
      searchQuery: this.fb.control(''),
    });
    this.searchForm.valueChanges.subscribe(() => {
      this.filterProducts();
    });

    this.subscription = this.restaurantService
      .getRestaurantsbyId(this.resId.toString())
      .subscribe(
        (response) => {
          this.restaurant = response;
          this.imgSrc = `${this.cloudinaryBaseURL}${this.restaurant.cloudinaryImageId}`;
        },
        (error) => {
          console.log('Error in fetching restaurant details by id', error);
        }
      );

    this.sub = this.restaurantService
      .getMenuDetailsofRestaurant(this.resId.toString())
      .subscribe(
        (response) => {
          this.menuList = response;
          this.filtered = response;
        },
        (error) => {
          console.log('Error in fetching menudetails of restaurant', error);
        }
      );

    document.querySelectorAll('.add-to-cart').forEach((button) => {
      button.addEventListener('click', (e) => {
        button.classList.toggle('added');
      });
    });
  }


  
  decreaseItem(menuId: string) {
    this.cartService.decreaseItem(this.userId, menuId).subscribe(
      (data) => {
        this.snackBar.open('Cart Updated', 'OK', {
          duration: 3000,
        });
        
      },
      (error) => {
        console.error('Error while decreasing item in cart: ' + error);
      }
    );
  }

  removeFilter() {
    this.filtered = this.menuList;
  }

  toggleVegFilter() {
    this.filtered = this.menuList.filter((item) => item.isVeg === '1');
  }
  toggleNonVegFilter() {
    this.filtered = this.menuList.filter((item) => item.isVeg === '0');
  }

  getcartid() {
    this.cartService.getCart(this.userId).subscribe((cart) => {
      this.cart = cart;
      this.cartId = this.cart.id;
    });
  }
  isItemInCart(itemId: string): boolean {
    return this.cart.items.has(itemId);
  }
  getItemQuantity(itemId: string): number {
    return this.cart.items.get(itemId) ?? 0;
  }

  addIteminCart(menuId: string) {
    this.cartService.addItemToCart(this.userId, menuId).subscribe(
      (data) => {
        this.snackBar.open('Item added to cart', 'OK', {
          duration: 3000,
        });
        if (!this.cart.items[menuId]) {
          this.cart.items[menuId] = 1;
        } else {
          this.cart.items[menuId]++;
        }

        
      },
      (error) => {
        console.error('Error while adding item to cart: ');
        console.error(error);
      }
    );
  }

  removeItem(menuId: string) {
    this.cartService.removeItem(this.userId, menuId).subscribe({
      next: (cart) => {
        this.snackBar.open('Item removed from cart', 'OK');
        this.cart = cart;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  filterProducts() {
    let query = this.searchForm.get('searchQuery')?.value;
    if (query.length === 0) {
      this.filtered = this.menuList;
    }
    if (query.length > 1) {
      this.filtered = this.menuList.filter((item) => {
        return (
          item.name.toLowerCase().includes(query.toLowerCase()) ||
          item.description.toLowerCase().includes(query.toLowerCase()) ||
          item.category.toLowerCase().includes(query.toLowerCase())
        );
      });
    }
  }

  openEndSignIn(contentsignin: TemplateRef<any>) {
    this.offcanvasService.open(contentsignin, { position: 'end' });
  }
  openReviews(reviewcontent: TemplateRef<any>) {
    this.getReviews(this.resId);
    this.offcanvasService.open(reviewcontent, { position: 'end' });
  }
  onSubmit() {
    // const restaurantId = '123'; // Replace with the actual restaurant ID
    const review = {
      comment: this.reviewText,
      rating: Number(this.rating),
    };

    this.restaurantService.addReview(this.resId, review).subscribe(
      (response) => {
        this.snackBar.open('Review Added Successfully !!', 'OK', {
          duration: 3000,
        });
      },
      (error) => {
        console.error(error);
      }
    );
  }

  getReviews(resId: number) {
    
    const apiUrl = `http://localhost:8080/restaurants/${this.resId}/reviews`;

    this.httpclient.get(apiUrl).subscribe(
      (response: any[]) => {
        this.reviews = response;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
