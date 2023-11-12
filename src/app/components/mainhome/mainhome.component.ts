import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
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
  userInfo: any;

  constructor(
    private offcanvasService: NgbOffcanvas,
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService
  ) {}
  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      userName: new FormControl(''),
      email: new FormControl(''),
      password: new FormControl(''),
    });
    this.signInForm = this.fb.group({
      email: new FormControl(''),
      password: new FormControl(''),
    });
  }
  onSubmit() {
    console.warn(this.signUpForm.value);
    this.user = this.signUpForm.value;
    console.log(this.user);
    this.userService.registration(this.user).subscribe((response) => {
      console.log(response);
      alert('Registered Successfully! Please Log In');
    });
  }
  onSubmitIn() {
    // console.warn(this.signInForm.value);
    this.user = this.signInForm.value;
    console.log(this.user);
    this.userService.loginUser(this.user).subscribe((response) => {
      this.userInfo = response;
      // console.log(response);
      alert('Logged IN');
      console.log(' Logged In');
      localStorage.setItem('user', JSON.stringify(this.userInfo));
      console.log('hi');
      console.error(localStorage.getItem('user'));
      console.log('hi');
      localStorage.setItem('email', this.userInfo.email);
      localStorage.setItem('id', this.userInfo.id);
      this.router.navigate(['/dashboard']);
    });
  }
  openEndSignIn(contentsignin: TemplateRef<any>) {
    this.offcanvasService.open(contentsignin, { position: 'end' });
  }
  openEndSignUp(contentsignup: TemplateRef<any>) {
    this.offcanvasService.open(contentsignup, { position: 'end' });
  }
}
