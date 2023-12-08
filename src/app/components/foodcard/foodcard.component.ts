import { Component, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Menu } from 'src/shared/model/menu';
import { Restaurant } from 'src/shared/model/restaurant';
import { CartService } from 'src/shared/services/cart.service';
import { UserService } from 'src/shared/services/user.service';

@Component({
  selector: 'app-foodcard',
  templateUrl: './foodcard.component.html',
  styleUrls: ['./foodcard.component.scss'],
})
export class FoodcardComponent {
  @Input() res: Menu;
  imgSrc: string;
  imageUrls: string[] = [
    'https://images.news18.com/ibnlive/uploads/2022/01/shutterstock_649541308-1.jpg',
    'https://articles-images.sftcdn.net/wp-content/uploads/sites/3/2019/08/1280-Indian-food.jpg',
    'https://images.livemint.com/img/2022/12/15/1600x900/swiggy_biryani_1671108299094_1671108299222_1671108299222.jpg',
    'https://cdna.artstation.com/p/assets/covers/images/019/003/202/large/ankit-kashyap-vegetable-wrap.jpg?1561580944',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLBNFmidHEh5ARsvRUMpajhoteJX0zpB9bdwS0GNCafwz9KCOD7i7ZWSd3kwVsoEyHji8&usqp=CAU',
    'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_366/19ce20eb68d3abef762ebce33b535640',
    'https://console.kr-asia.com/wp-content/uploads/2021/02/pexels-caleb-oquendo-3023476-scaled.jpg',
    'https://www.hotelierindia.com/wp-content/uploads/cloud/2023/05/08/image-6-1024x768.png',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjxjy0j6yWr8Xvxp7P1yVZDH1BPxqDxnSCpQ&usqp=CAU',
    'https://blog.swiggy.com/wp-content/uploads/2023/07/swiggy-explorer.png',
    'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_366/v9fczzlua1wnrx63fh1g',
    'https://feeds.abplive.com/onecms/images/uploaded-images/2023/05/07/11790cd8b23e34e9c39daf7d354acb9c1683458634697601_original.png?impolicy=abp_cdn&imwidth=650',
    'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_366/pq88wye1kehhliuahh7x',
    'https://images.pexels.com/photos/2591594/pexels-photo-2591594.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    'https://plus.unsplash.com/premium_photo-1661677425561-ac8dda0082b2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Zm9vZCUyMG1lbnV8ZW58MHx8MHx8fDA%3D',
    'https://images.unsplash.com/photo-1559847844-5315695dadae?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Zm9vZCUyMG1lbnV8ZW58MHx8MHx8fDA%3D',
    'https://images.unsplash.com/photo-1612939675110-fe3a0129a024?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Zm9vZCUyMG1lbnV8ZW58MHx8MHx8fDA%3D',
    'https://images.unsplash.com/photo-1604908177453-7462950a6a3b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGZvb2QlMjBtZW51fGVufDB8fDB8fHww',
    'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjR8fGZvb2QlMjBtZW51fGVufDB8fDB8fHww',
    'https://images.unsplash.com/photo-1579536568809-62154a3bee07?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjh8fGZvb2QlMjBtZW51fGVufDB8fDB8fHww',
    'https://plus.unsplash.com/premium_photo-1661265874417-f9a2f1981eda?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzN8fGZvb2QlMjBtZW51fGVufDB8fDB8fHww',
    'https://images.unsplash.com/photo-1542528180-a1208c5169a5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDR8fGZvb2QlMjBtZW51fGVufDB8fDB8fHww',
  ];
  userId: string;
  cloudinaryBaseURL =
    'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_208,h_208,c_fit/';

  constructor(
    private userService: UserService,
    private cartService:CartService,
    private snackBar: MatSnackBar
  ) {}
  ngOnInit() {
    this.userId = localStorage.getItem('id');
    
    this.imgSrc = `${this.cloudinaryBaseURL}${this.res.imageId}`;
  }
  addIteminCart(menuId: string) {
    
    this.cartService.addItemToCart(this.userId, menuId).subscribe(
      (data) => {
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

  
}
