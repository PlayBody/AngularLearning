import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MustMatch } from 'src/app/_helper/must-match.validator';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  @ViewChild('loginWindow', {static: false}) loginWindow! : ElementRef;
  @ViewChild('registerWindow', {static: false}) registerWindow! : ElementRef;

  loginIsShown = false;
  registerIsShown = false;
  form! : FormGroup;
  submitting = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit() {
      this.form = this.formBuilder.group({
        fullName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required],
      }, {
        validator: MustMatch('password', 'confirmPassword')
      })
  }

  // Convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  showLogin(){
    this.loginIsShown = true;
    setTimeout(() => {
      this.loginWindow.nativeElement.classList.add('animation');
    }, 0);
  }

  showRegister(){
    this.registerIsShown = true;
    setTimeout(() => {
      this.registerWindow.nativeElement.classList.add('animation');
    }, 0);
  }

  hideLogin() {
    this.loginIsShown = false;
  }

  hideRegister() {
    this.registerIsShown = false;
  }

  stopEvent(event: MouseEvent){
    event.stopPropagation();
  }

  onSubmit() {
    this.submitted = true;

    // Stop here if form is invalid
    if(this.form.invalid) {
      return;
    }

    this.submitting = true;
  }
}
