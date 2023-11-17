import { Component } from '@angular/core';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';

import { UserService } from 'src/shared/services/user.service';
import { User } from 'src/shared/model/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  constructor(private userService: UserService) {}
  userId: string;
  userData: User;

  ngOnInit(): void {
    this.userId = localStorage.getItem('id');
    this.profile(this.userId);
  }

  profile(userId: string) {
    this.userService.getUserById(this.userId).subscribe(
      (data) => {
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
