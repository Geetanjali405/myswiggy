import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/shared/model/user';
import { UserService } from 'src/shared/services/user.service';

@Component({
  selector: 'app-mainhome',
  templateUrl: './mainhome.component.html',
  styleUrls: ['./mainhome.component.scss'],
})
export class MainhomeComponent implements OnInit {
  signUpForm: FormGroup;
  signInForm: FormGroup;
  user = new User();
  userInfo: User;
  userId: string;
  delId: string;
  visible: boolean = false;

  constructor(
    private offcanvasService: NgbOffcanvas,
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService
  ) {}
  ngOnInit(): void {

    if (localStorage.getItem('user')) {
      this.router.navigate(['dashboard']);
    }
    this.signUpForm = this.fb.group({
      userName: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(20),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    });
    this.signInForm = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    });

    if (localStorage.getItem('user')) {
      // if (confirm('user already logged in') == true)
      this.router.navigate['/dashboard'];
    }
  }
  onSubmit() {
    console.warn(this.signUpForm.value);
    const formValue = this.signUpForm.value;
    const newUser: User = {
      userName: formValue.userName,
      email: formValue.email,
      password: formValue.password,
      phone: '',
      userAddress: '',
      userType: '',
      firstTimeUser: false,
      favouriteRestaurants: [],
    };
    this.user = newUser;
    console.log(this.user);
    this.userService.registration(this.user).subscribe((response) => {
      console.log(response);
      // alert('Registered Successfully! Please Log In');
      this.visible = true;
    });
  }
  onSubmitIn() {
    this.user = this.signInForm.value;
    console.log(this.user);
    this.userService.loginUser(this.user).subscribe((response) => {
      // this.userService.isuser$.next(true);
      this.userInfo = response;

      this.userService.setUser(true);
      localStorage.setItem('user', JSON.stringify(this.userInfo));
      console.warn(localStorage.getItem('user'));
      localStorage.setItem('email', this.userInfo.email);
      localStorage.setItem('id', this.userInfo.id);

      //creating cart for user
      this.userId = localStorage.getItem('id');
      this.userService.createCart(this.userId).subscribe(
        (cart) => {
          console.log('Cart created: ', cart);
        },
        (error) => {
          console.error('Error creating cart: ', error);
        }
      );

      console.log(this.userInfo.userType);

      if (this.userInfo.userType === 'Delivery') {
        localStorage.setItem('delId', this.userInfo.id);
        console.warn(this.delId);

        this.router.navigate(['/deliverydashboard']);
      } else {
        this.router.navigate(['/dashboard']);
      }
    });
  }

  openEndSignIn(contentsignin: TemplateRef<any>) {
    this.offcanvasService.open(contentsignin, { position: 'end' });
  }
  openEndSignUp(contentsignup: TemplateRef<any>) {
    this.offcanvasService.open(contentsignup, { position: 'end' });
  }
}
