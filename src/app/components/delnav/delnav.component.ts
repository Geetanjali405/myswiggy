import { Component ,OnInit} from '@angular/core';
import { User } from 'src/shared/model/user';
import { UserService } from 'src/shared/services/user.service';

@Component({
  selector: 'app-delnav',
  templateUrl: './delnav.component.html',
  styleUrls: ['./delnav.component.scss']
})
export class DelnavComponent implements OnInit {
  
  userData: User;
  constructor(
    private userService: UserService
  ) {}
  ngOnInit(): void {
    const userString = localStorage.getItem('user');
    this.userData = JSON.parse(userString);
    
  }

}
