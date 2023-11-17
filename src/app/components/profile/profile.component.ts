import { Component,OnInit } from '@angular/core';

import { UserService } from 'src/shared/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit{
  constructor(private userService: UserService) {}
  userId: string;
  userData: any;

  ngOnInit(): void {
    this.userId = localStorage.getItem('id');
    this.profile(this.userId);
  }

  profile(userId: string) {
    this.userService.getUserById(userId).subscribe(
      (data:any) => {
        console.log(data);
        this.userData = data;
        console.log(data.id);
        console.log(this.userData);
        console.log(this.userData.id);
        console.log(this.userData.password);
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
