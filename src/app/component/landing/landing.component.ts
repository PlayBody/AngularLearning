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
    private storageService: StorageService
  ) {}

  ngOnInit() {

      if(this.storageService.isLoggedIn()) {
        this.isLogged = true;
      }
  }

  // Convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  showLogin(){
    if (this.isLogged) {
      this.logout();
    } else {
      this.loginIsShown = true;
      setTimeout(() => {
        this.loginWindow.nativeElement.classList.add('animation');
      }, 0);
    }
    
  }

  showRegister(){
    if (this.isLogged) {
      this.router.navigate(['/dashboard'])
    } else {
      this.registerIsShown = true;
      setTimeout(() => {
        this.registerWindow.nativeElement.classList.add('animation');
      }, 0);
    }
    
  }

  logout() {
    this.authService.logout().subscribe({
      next: (res) => {
        console.log(res);
        if(res) {
          window.location.reload();
          this.storageService.clean()
        }
      },
      error: (e) => {
        console.log(e)
      }
    })
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
 
}
