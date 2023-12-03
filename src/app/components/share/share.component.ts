import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-share',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.scss']
})
export class ShareComponent {

  @Input() type: 'facebook' | 'twitter';
  @Input() shareUrl: string;
  navUrl: string;

  constructor() { }

  ngOnInit() {
    this.createNavigationUrl();
  }

  private createNavigationUrl() {
    let searchParams = new URLSearchParams();


    switch(this.type) {
      case 'facebook':
        searchParams.set('u', this.shareUrl);
        this.navUrl = 'https://www.facebook.com/sharer/sharer.php?' + searchParams;
        break;
      case 'twitter':
        searchParams.set('url', this.shareUrl);
        this.navUrl =  'https://twitter.com/share?' + searchParams;
        break;
    }
  }

  public share() {
    return window.open(this.navUrl, "_blank");
  }
}
