import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { UserService } from 'src/shared/services/user.service';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  @Input() res: any;
  imgSrc: string;
  id: string;
  isFav: boolean = false;
  favarr: any;

  cloudinaryBaseURL =
    'https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_1024/';

  constructor(private userService: UserService) {}
  fav = null;
  ngOnInit() {
    this.id = localStorage.getItem('id');

    // this.fav = setInterval(() => {
      this.getFav(this.id);
    // }, 1000);

    this.imgSrc = `${this.cloudinaryBaseURL}${this.res.cloudinaryImageId}`;
  }

  // ngOnDestroy(): void {
  //   clearInterval(this.fav);
  // }

  //favarr<=array of favourites
  getFav(id: string) {
    this.userService.getFav(id).subscribe({
      next: (data) => {
        this.favarr = data;
        console.log(this.favarr);
      },
      error: (er) => {
        console.log(er);
      },
    });
  }

  addToFav(id: string, restId: string) {
    this.userService.addToFav(id, restId).subscribe({
      next: (res) => {
        console.log(res);
        this.getFav(id);
      },
      error: (er) => {
        console.warn(er);
      },
    });

  }
  removeFromFav(id: string, restId: string) {
    this.userService.removeFromFav(id, restId).subscribe({
      next: (res) => {
        console.log(res);
        this.getFav(id);
      },
      error: (er) => {
        console.warn(er);
      },
    });
  }

  issFav(resId: string): boolean {
    // console.log(this.favarr);
    if (this.favarr && this.favarr.includes(resId)) {
      return true;
    } else {
      return false;
    }
  }
}
