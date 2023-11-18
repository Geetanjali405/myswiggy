import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from 'src/shared/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  constructor(private userService: UserService, private router: Router) {}
  userId: string;
  userData: any;
  email: any;

  ngOnInit(): void {
    this.email = localStorage.getItem('email');
    console.warn('email');

    const userString = localStorage.getItem('user');
    this.userData = JSON.parse(userString);
    console.log(this.userData);
    this.userId = localStorage.getItem('id');

    // this.profile(this.userId);
  }

  // profile(userId: string) {
  //   this.userService.getUserById(userId).subscribe(
  //     (data) => {
  //       console.log(data);
  //       this.userData = data;
  //       console.log(data.id);
  //       console.log(this.userData);
  //       console.log(this.userData.id);
  //       console.log(this.userData.password);
  //     },
  //     (error) => {
  //       console.error(error);
  //     }
  //   );
  // }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
