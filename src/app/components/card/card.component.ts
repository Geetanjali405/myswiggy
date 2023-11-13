import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input() res: any;
  imgSrc: string;
  cloudinaryBaseURL = 'https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_1024/';
  
  ngOnInit() {
    console.log('Current restaurant:', this.res);
    this.imgSrc= `${this.cloudinaryBaseURL}${this.res.cloudinaryImageId}`;
  }
}
