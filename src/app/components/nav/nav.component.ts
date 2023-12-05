import { Component, OnInit } from '@angular/core';
import { User } from 'src/shared/model/user';
import { UserService } from 'src/shared/services/user.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  userData: User;
  userType: string;
  constructor(private userService: UserService) {}
  ngOnInit(): void {
    const userString = localStorage.getItem('user');
    this.userData = JSON.parse(userString);
   
    this.userType = this.userData.userType;

  }
}
