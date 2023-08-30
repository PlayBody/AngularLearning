import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs';

import { AuthService } from 'src/app/service/auth.service';
import { StorageService } from 'src/app/service/storage.service';
import { Account } from 'src/app/_model/account';

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
  submitted = false;
  isLogged = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private storageSevice: StorageService
  ) {}

  ngOnInit() {

      if(this.storageSevice.isLoggedIn()) {
        this.isLogged = true;
      }
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

  nextPage(){
    this.router.navigate(['/dashboard'])
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

  regIsSuceed(){
    this.registerIsShown = false;
  }

  // onSubmitLogin() {
  //   this.submitted = true;

  //   // Stop here if form is invalid
  //   // if(this.form.invalid) {
  //   //   return;
  //   // }

  //   // console.log(this.form.value)
  //   this.authService.login(this.f['email'].value, this.f['password'].value)
  //     .pipe(first())
  //     .subscribe({
  //       next: (res) => {
  //         this.storageSevice.saveUser(res)
  //         this.router.navigate(['/dashboard']);
  //       },
  //       error: (error) => {
  //         console.error(error)
  //       }
  //     })
  // }

  // onSubmitRegister() {
  //   this.submitted = true;

  //   // Stop here if form is invalid
  //   if(this.form.invalid) {
  //     return;
  //   }

  //   delete this.form.value.confirmPassword;
  //   let reg_userInfo: Account = this.form.value
  //   console.log(reg_userInfo)

  //   this.authService.register(reg_userInfo)
  //     .pipe(first())
  //     .subscribe({
  //       next: (res) => {
  //         console.log(res)
  //         if(res) {
  //           this.registerIsShown = false;
  //           // window.location.reload();
  //         }
  //       },
  //       error: (e) => {
  //         console.log(e);
  //       }
  //     })
  // }
}
