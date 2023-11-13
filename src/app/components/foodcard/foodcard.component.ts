import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-foodcard',
  templateUrl: './foodcard.component.html',
  styleUrls: ['./foodcard.component.scss'],
})
export class FoodcardComponent {
  @Input() res: any;
  imgSrc: string;
  cloudinaryBaseURL =
    'https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_1024/';

  ngOnInit() {
    console.log('Current FOOD ITEM:', this.res);
    this.imgSrc = `${this.cloudinaryBaseURL}${this.res.restId}`;
  }
}
