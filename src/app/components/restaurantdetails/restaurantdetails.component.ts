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
    'https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_1024/';
  imgSrc: string;
  layout: string = 'list';
  searchForm: FormGroup;
  reviewText = '';
  rating = '';
  reviews: any[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private cartService: CartService,
    private restaurantService: RestaurantService,
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
    private offcanvasService: NgbOffcanvas,
    private httpclient: HttpClient
  ) {}
  ngOnInit(): void {
    this.resId = this.route.snapshot.params['id'];
    this.userId = localStorage.getItem('id');
    // console.log('line 31');
    console.log(this.userId);
    // console.log(this.resId);

    this.searchForm = this.fb.group({
      searchQuery: this.fb.control(''),
    });
    this.searchForm.valueChanges.subscribe(() => {
      this.filterProducts();
      console.log(this.searchForm.value);
    });

    this.subscription = this.restaurantService
      .getRestaurantsbyId(this.resId.toString())
      .subscribe(
        (response) => {
          this.restaurant = response;
          this.imgSrc = `${this.cloudinaryBaseURL}${this.restaurant.cloudinaryImageId}`;
          console.log(response);
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
          console.log(response);
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

  removeFilter() {
    this.filtered = this.menuList;
  }

  toggleVegFilter() {
    this.filtered = this.menuList.filter((item) => item.isVeg === '1');
  }
  toggleNonVegFilter() {
    this.filtered = this.menuList.filter((item) => item.isVeg === '0');
  }

  addIteminCart(menuId: string) {
    this.cartService.addItemToCart(this.userId, menuId).subscribe(
      (data) => {
        console.log('Item added to cart successfully!');
        this.snackBar.open('Item added to cart', 'OK', {
          duration: 3000,
        });
      },
      (error) => {
        console.error('Error while adding item to cart: ');
        console.error(error);
      }
    );
  }

  filterProducts() {
    let query = this.searchForm.get('searchQuery')?.value;
    console.log(query);
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
      console.log(this.filtered);
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
    // const restaurantId = 15680; // replace this with the actual restaurant ID
    const apiUrl = `http://localhost:8080/restaurants/${this.resId}/reviews`;

    this.httpclient.get(apiUrl).subscribe(
      (response: any[]) => {
        this.reviews = response;
        console.log(this.reviews);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
