import { Component, Input } from '@angular/core';
import { UserService } from 'src/shared/services/user.service';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  @Input() res: any;
  imgSrc: string;
  id: string;
  isFav: boolean = false;
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

 

  toggleFav():void {
    this.isFav = true;
    if (this.isFav) {
      this.addToFav(this.id, this.res.id);
    }
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
