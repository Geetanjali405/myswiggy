import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarComponent } from 'src/shared/sharedcomp/navbar/navbar.component';
import { CarouselModule } from 'primeng/carousel';
import { Subscription } from 'rxjs';
import { UserService } from 'src/shared/services/user.service';
import * as $ from 'jquery';
import { Restaurant } from 'src/shared/model/restaurant';
import { User } from 'src/shared/model/user';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  public images = [
    {
      image:
        'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_850,h_504/rng/md/carousel/production/0e6696b881c2d8df0e5461563133fd2a',
    },
    {
      image:
        'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_850,h_504/rng/md/carousel/production/1ca7c0761ad853cdbff66442ed3b8666',
    },
    {
      image:
        'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_850,h_504/rng/md/carousel/production/60f3b1e7576a7286f8cf0f4b3db118ba',
    },
    {
      image:
        'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_850,h_504/rng/md/carousel/production/3c1f26597885682c476cae3f9096a04f',
    },
    {
      image:
        'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_850,h_504/rng/md/carousel/production/5a62864f0d42a5eb0eff89def4516354',
    },
    {
      image:
        'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_850,h_504/rng/md/carousel/production/bb21b618a8d5fa8e7030ba2f5e3e6695',
    },
    {
      image:
        'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_850,h_504/rng/md/carousel/production/684cb45787a1611c75b740f28abbcb61',
    },
    {
      image:
        'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_850,h_504/rng/md/carousel/production/c6ecfbe96b4dc6ce6cbe6fcdbe7ab2ae',
    },
  ];
  public imagess = [
    {
      image:
        'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/v1674029853/PC_Creative%20refresh/3D_bau/banners_new/Paratha.png',
    },
    {
      image:
        'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/v1674029859/PC_Creative%20refresh/3D_bau/banners_new/Salad.png',
    },
    {
      image:
        'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/v1675667625/PC_Creative%20refresh/Biryani_2.png',
    },
    {
      image:
        'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/v1674029852/PC_Creative%20refresh/3D_bau/banners_new/Momos.png',
    },
    {
      image:
        'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/v1674029858/PC_Creative%20refresh/3D_bau/banners_new/Rolls.png',
    },
    {
      image:
        'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/v1675667626/PC_Creative%20refresh/South_Indian_4.png',
    },
    {
      image:
        'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/v1675667630/PC_Creative%20refresh/Desserts_2.png',
    },
    {
      image:
        'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/v1674029854/PC_Creative%20refresh/3D_bau/banners_new/Pav_Bhaji.png',
    },
    {
      image:
        'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/v1674029853/PC_Creative%20refresh/3D_bau/banners_new/Kebabs.png',
    },
    {
      image:
        'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/v1674029845/PC_Creative%20refresh/3D_bau/banners_new/Cakes.png',
    },
    {
      image:
        'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/v1674029858/PC_Creative%20refresh/3D_bau/banners_new/Pure_Veg.png',
    },
    {
      image:
        'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/v1674029855/PC_Creative%20refresh/3D_bau/banners_new/Noodles.png',
    },
    {
      image:
        'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/v1674029851/PC_Creative%20refresh/3D_bau/banners_new/Ice_Creams.png',
    },
    {
      image:
        'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/v1674029846/PC_Creative%20refresh/3D_bau/banners_new/Idli.png',
    },
    {
      image:
        'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/v1674029850/PC_Creative%20refresh/3D_bau/banners_new/Dosa.png',
    },
    {
      image:
        'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/v1675667625/PC_Creative%20refresh/North_Indian_4.png',
    },
    {
      image:
        'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/v1675667625/PC_Creative%20refresh/North_Indian_4.png',
    },
    {
      image:
        'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/v1674029859/PC_Creative%20refresh/3D_bau/banners_new/Shawarma.png',
    },
    {
      image:
        'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/v1674029848/PC_Creative%20refresh/3D_bau/banners_new/Chinese.png',
    },
    {
      image:
        'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/v1674029845/PC_Creative%20refresh/3D_bau/banners_new/Burger.png',
    },
    {
      image:
        'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/v1674029856/PC_Creative%20refresh/3D_bau/banners_new/Pizza.png',
    },
  ];
  restaurantList: Restaurant[];
  subscription: Subscription;
  isAscending: boolean;
  userData: User;
  constructor(private router: Router, private userService: UserService) {}

  ngOnInit(): void {
    console.warn(localStorage.getItem('id'));
    const userString = localStorage.getItem('user');
    this.userData = JSON.parse(userString);
    // this.subInterval = setInterval(() => {
    this.subscription = this.userService.getRestrauntDetails().subscribe(
      (response) => {
        this.restaurantList = response;
        console.log(response);
      },
      (error) => {
        console.log('Error in fetching restaurant details', error);
      }
    );
    // }, 5000);
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
