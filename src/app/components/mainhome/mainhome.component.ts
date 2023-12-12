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
import { MatSnackBar } from '@angular/material/snack-bar';
import { CartService } from 'src/shared/services/cart.service';
import { Cart } from 'src/shared/model/cart';

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
  cartId: string;
  activeCart: Cart;
  delId: string;
  visible: boolean = false;
  selectedLocation: string = '';
  constructor(
    private offcanvasService: NgbOffcanvas,
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService,
    private cartService:CartService,
    private snackbar: MatSnackBar
  ) { }
  
  onLocationChange(): void {
    localStorage.setItem('selectedLocation', this.selectedLocation);
  }
  ngOnInit(): void {
    
    if (localStorage.getItem('user')) {
      this.router.navigate(['dashboard']);
    }
    this.signUpForm = this.fb.group({
      userName: new FormControl(''),
      email: new FormControl(''),
      password: new FormControl(''),
      // userType: new FormControl(false),
       userType: ['customer'],
      
    });
    this.signInForm = this.fb.group({
      email: new FormControl(''),
      password: new FormControl(''),
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
      userType: formValue.userType, 
      firstTimeUser: false,
      favouriteRestaurants: [],
      status: formValue.userType === 'Delivery' ? 'PENDING' : 'APPROVED', 
    };
    this.user = newUser;
    
    this.userService.registration(this.user).subscribe((response) => {
     
      
      // alert('Registered Successfully! Please Log In');
      this.visible = true;
    });
  }

  
  onSubmitIn() {
    this.user = this.signInForm.value;

    this.userService.loginUser(this.user).subscribe({
      next: (response) => {
        // this.userService.isuser$.next(true);
        if (response) {
          this.userInfo = response;

          this.userService.setUser(true);
          localStorage.setItem('user', JSON.stringify(this.userInfo));
          console.warn(localStorage.getItem('user'));
          localStorage.setItem('email', this.userInfo.email);
          localStorage.setItem('id', this.userInfo.id);

          //creating cart for user
          this.userId = localStorage.getItem('id');
          this.cartService.createCart(this.userId).subscribe(
            (cart) => {
              this.activeCart = cart;
              // const cartString = JSON.stringify(cart);
              // localStorage.setItem('cart', cartString);
              this.cartId = this.activeCart.id;
              localStorage.setItem('cartId', this.cartId);
              console.log('Cart created: ', cart);
            
            },
            (error) => {
              console.error('Error creating cart: ', error);
            }
          );


          if (this.userInfo.userType === 'Delivery') {
            localStorage.setItem('delId', this.userInfo.id);
            console.warn(this.delId);

            this.router.navigate(['/deliverydashboard']);
          } else {
            this.router.navigate(['/dashboard']);
          }
        }
        else {
          this.snackbar.open("Wrong credentials", "Try again", {
            duration: 3000
          });
        }
      },
      error: (er) => {
        console.error('some error subscribing');
      },
    });
  }

  openEndSignIn(contentsignin: TemplateRef<any>) {
    this.offcanvasService.open(contentsignin, { position: 'end' });
  }
  openEndSignUp(contentsignup: TemplateRef<any>) {
    this.offcanvasService.open(contentsignup, { position: 'end' });
  }
}
