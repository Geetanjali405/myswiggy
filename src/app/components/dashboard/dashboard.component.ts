import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarComponent } from 'src/shared/sharedcomp/navbar/navbar.component';
import { CarouselModule } from 'primeng/carousel';
import { Subscription } from 'rxjs';
import { UserService } from 'src/shared/services/user.service';
import * as $ from 'jquery';
import { Restaurant } from 'src/shared/model/restaurant';
import { User } from 'src/shared/model/user';
import { RestaurantService } from 'src/shared/services/restaurant.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  // public images = [
  //   {
  //     image:
  //       'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_850,h_504/rng/md/carousel/production/0e6696b881c2d8df0e5461563133fd2a',
  //   },
  //   {
  //     image:
  //       'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_850,h_504/rng/md/carousel/production/1ca7c0761ad853cdbff66442ed3b8666',
  //   },
  //   {
  //     image:
  //       'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_850,h_504/rng/md/carousel/production/60f3b1e7576a7286f8cf0f4b3db118ba',
  //   },
  //   {
  //     image:
  //       'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_850,h_504/rng/md/carousel/production/3c1f26597885682c476cae3f9096a04f',
  //   },
  //   {
  //     image:
  //       'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_850,h_504/rng/md/carousel/production/5a62864f0d42a5eb0eff89def4516354',
  //   },
  //   {
  //     image:
  //       'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_850,h_504/rng/md/carousel/production/bb21b618a8d5fa8e7030ba2f5e3e6695',
  //   },
  //   {
  //     image:
  //       'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_850,h_504/rng/md/carousel/production/684cb45787a1611c75b740f28abbcb61',
  //   },
  //   {
  //     image:
  //       'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_850,h_504/rng/md/carousel/production/c6ecfbe96b4dc6ce6cbe6fcdbe7ab2ae',
  //   },
  // ];
  // public images = [
  //   'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_850,h_504/rng/md/carousel/production/0e6696b881c2d8df0e5461563133fd2a',
  //   'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_850,h_504/rng/md/carousel/production/1ca7c0761ad853cdbff66442ed3b8666',
  //   'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_850,h_504/rng/md/carousel/production/60f3b1e7576a7286f8cf0f4b3db118ba',
  //   'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_850,h_504/rng/md/carousel/production/3c1f26597885682c476cae3f9096a04f',
  //   'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_850,h_504/rng/md/carousel/production/5a62864f0d42a5eb0eff89def4516354',
  //   'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_850,h_504/rng/md/carousel/production/bb21b618a8d5fa8e7030ba2f5e3e6695',
  //   'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_850,h_504/rng/md/carousel/production/684cb45787a1611c75b740f28abbcb61',
  //   'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_850,h_504/rng/md/carousel/production/c6ecfbe96b4dc6ce6cbe6fcdbe7ab2ae',
  // ];
  // public imagess = [
  //   {
  //     image:
  //       'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/v1674029853/PC_Creative%20refresh/3D_bau/banners_new/Paratha.png',
  //   },
  //   {
  //     image:
  //       'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/v1674029859/PC_Creative%20refresh/3D_bau/banners_new/Salad.png',
  //   },
  //   {
  //     image:
  //       'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/v1675667625/PC_Creative%20refresh/Biryani_2.png',
  //   },
  //   {
  //     image:
  //       'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/v1674029852/PC_Creative%20refresh/3D_bau/banners_new/Momos.png',
  //   },
  //   {
  //     image:
  //       'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/v1674029858/PC_Creative%20refresh/3D_bau/banners_new/Rolls.png',
  //   },
  //   {
  //     image:
  //       'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/v1675667626/PC_Creative%20refresh/South_Indian_4.png',
  //   },
  //   {
  //     image:
  //       'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/v1675667630/PC_Creative%20refresh/Desserts_2.png',
  //   },
  //   {
  //     image:
  //       'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/v1674029854/PC_Creative%20refresh/3D_bau/banners_new/Pav_Bhaji.png',
  //   },
  //   {
  //     image:
  //       'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/v1674029853/PC_Creative%20refresh/3D_bau/banners_new/Kebabs.png',
  //   },
  //   {
  //     image:
  //       'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/v1674029845/PC_Creative%20refresh/3D_bau/banners_new/Cakes.png',
  //   },
  //   {
  //     image:
  //       'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/v1674029858/PC_Creative%20refresh/3D_bau/banners_new/Pure_Veg.png',
  //   },
  //   {
  //     image:
  //       'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/v1674029855/PC_Creative%20refresh/3D_bau/banners_new/Noodles.png',
  //   },
  //   {
  //     image:
  //       'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/v1674029851/PC_Creative%20refresh/3D_bau/banners_new/Ice_Creams.png',
  //   },
  //   {
  //     image:
  //       'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/v1674029846/PC_Creative%20refresh/3D_bau/banners_new/Idli.png',
  //   },
  //   {
  //     image:
  //       'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/v1674029850/PC_Creative%20refresh/3D_bau/banners_new/Dosa.png',
  //   },
  //   {
  //     image:
  //       'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/v1675667625/PC_Creative%20refresh/North_Indian_4.png',
  //   },
  //   {
  //     image:
  //       'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/v1675667625/PC_Creative%20refresh/North_Indian_4.png',
  //   },
  //   {
  //     image:
  //       'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/v1674029859/PC_Creative%20refresh/3D_bau/banners_new/Shawarma.png',
  //   },
  //   {
  //     image:
  //       'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/v1674029848/PC_Creative%20refresh/3D_bau/banners_new/Chinese.png',
  //   },
  //   {
  //     image:
  //       'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/v1674029845/PC_Creative%20refresh/3D_bau/banners_new/Burger.png',
  //   },
  //   {
  //     image:
  //       'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/v1674029856/PC_Creative%20refresh/3D_bau/banners_new/Pizza.png',
  //   },
  // ];
  // public imagess = [
  //   'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/v1674029853/PC_Creative%20refresh/3D_bau/banners_new/Paratha.png',
  //   'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/v1674029859/PC_Creative%20refresh/3D_bau/banners_new/Salad.png',
  //   'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/v1675667625/PC_Creative%20refresh/Biryani_2.png',
  //   'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/v1674029852/PC_Creative%20refresh/3D_bau/banners_new/Momos.png',
  //   'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/v1674029858/PC_Creative%20refresh/3D_bau/banners_new/Rolls.png',
  //   'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/v1675667626/PC_Creative%20refresh/South_Indian_4.png',
  //   'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/v1675667630/PC_Creative%20refresh/Desserts_2.png',
  //   'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/v1674029854/PC_Creative%20refresh/3D_bau/banners_new/Pav_Bhaji.png',
  //   'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/v1674029853/PC_Creative%20refresh/3D_bau/banners_new/Kebabs.png',
  //   'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/v1674029845/PC_Creative%20refresh/3D_bau/banners_new/Cakes.png',
  //   'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/v1674029858/PC_Creative%20refresh/3D_bau/banners_new/Pure_Veg.png',
  //   'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/v1674029855/PC_Creative%20refresh/3D_bau/banners_new/Noodles.png',
  //   'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/v1674029851/PC_Creative%20refresh/3D_bau/banners_new/Ice_Creams.png',
  //   'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/v1674029846/PC_Creative%20refresh/3D_bau/banners_new/Idli.png',
  //   'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/v1674029850/PC_Creative%20refresh/3D_bau/banners_new/Dosa.png',
  //   'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/v1675667625/PC_Creative%20refresh/North_Indian_4.png',
  //   'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/v1675667625/PC_Creative%20refresh/North_Indian_4.png',
  //   'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/v1674029859/PC_Creative%20refresh/3D_bau/banners_new/Shawarma.png',
  //   'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/v1674029848/PC_Creative%20refresh/3D_bau/banners_new/Chinese.png',
  //   'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/v1674029845/PC_Creative%20refresh/3D_bau/banners_new/Burger.png',
  //   'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/v1674029856/PC_Creative%20refresh/3D_bau/banners_new/Pizza.png',
  // ];
  restaurantList: Restaurant[];
  subscription: Subscription;
  isAscending: boolean;
  userData: User;
  images: string[];
  imagess: string[];
  userId: string;
  constructor(
    private router: Router,
    private userService: UserService,
    private restaurantService: RestaurantService
  ) {}

  ngOnInit(): void {
    console.warn(localStorage.getItem('id'));
    this.userId = localStorage.getItem('id');
    const userString = localStorage.getItem('user');
    this.userData = JSON.parse(userString);
    this.subscription = this.restaurantService.getRestrauntDetails().subscribe(
      (response) => {
        this.restaurantList = response;
      },
      (error) => {
        console.log('Error in fetching restaurant details', error);
      }
    );
    // this.images=this.us
    this.userService.getoffer(this.userId).subscribe(
      (response) => {
        this.images = response;
      },
      (error) => {
        console.error(error);
      }
    );
    this.userService.getcate(this.userId).subscribe(
      (response) => {
        this.imagess = response;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  toggleSortByRating(): void {
    const isAscending =
      this.isAscending === undefined ? true : this.isAscending;
    this.restaurantList.sort((a, b) => {
      const ratingA = parseFloat(a.avgRatingString);
      const ratingB = parseFloat(b.avgRatingString);
      if (isAscending) {
        return ratingA - ratingB;
      } else {
        return ratingB - ratingA;
      }
    });
    this.isAscending = !isAscending;
  }

  clearfilter() {
    this.subscription = this.restaurantService.getRestrauntDetails().subscribe(
      (response) => {
        this.restaurantList = response;
      },
      (error) => {
        console.log('Error in fetching restaurant details', error);
      }
    );
  }

  toggleSortBynoofRatings(): void {
    const isAscending =
      this.isAscending === undefined ? true : this.isAscending;
    this.restaurantList.sort((a, b) => {
      const ratingA = parseFloat(a.totalRatingsString);
      const ratingB = parseFloat(b.totalRatingsString);
      if (isAscending) {
        return ratingA - ratingB;
      } else {
        return ratingB - ratingA;
      }
    });
    this.isAscending = !isAscending;
  }
}
