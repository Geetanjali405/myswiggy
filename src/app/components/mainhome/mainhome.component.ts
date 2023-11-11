import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-mainhome',
  templateUrl: './mainhome.component.html',
  styleUrls: ['./mainhome.component.scss'],
})
export class MainhomeComponent implements OnInit {
  signUpForm: FormGroup;
  signInForm: FormGroup;

  constructor(
    private offcanvasService: NgbOffcanvas,
    private fb: FormBuilder
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
  }
  onSubmitIn() {
    console.warn(this.signInForm.value);
  }
  openEndSignIn(contentsignin: TemplateRef<any>) {
    this.offcanvasService.open(contentsignin, { position: 'end' });
  }
  openEndSignUp(contentsignup: TemplateRef<any>) {
    this.offcanvasService.open(contentsignup, { position: 'end' });
  }
}
