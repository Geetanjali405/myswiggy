import { Component, Input } from '@angular/core';
import { UserService } from 'src/shared/services/user.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  @Input() res: any;
  imgSrc: string;
  id: string;
  cloudinaryBaseURL =
    'https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_1024/';

  constructor(private userService: UserService) {}
  ngOnInit() {
    // console.log('Current restaurant:', this.res);
    this.id = localStorage.getItem('id');
    // console.log(this.id);
    // console.error(this.id);
    // console.warn(this.id);
    // console.log(this.id);
    this.imgSrc = `${this.cloudinaryBaseURL}${this.res.cloudinaryImageId}`;
  }
  addToFav(id: string, restId: string) {
    this.userService.addToFav(id, restId).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (er) => {
        console.warn(er);
      }
    })

    this.userService.getFav(id).subscribe({
      next: (res) => {
        
      },
      error: (er) => {
        console.log(er);
      }
    })
  }
}
