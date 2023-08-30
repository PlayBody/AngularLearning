import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/service/auth.service';
import { StorageService } from 'src/app/service/storage.service';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  form! : FormGroup;
  submitted = false;

  @Output() clicked = new EventEmitter<void>();

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private storageService: StorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }
  
  get f() { return this.form.controls; }

  hideLoginEvent(){
    this.clicked.emit();
  }

  SubmitLogin(){
    this.submitted = true;

    // Stop here if form is invalid
    if(this.form.invalid) {
      return;
    }
    
    console.log("Submit Login");

    let testText = this.authService.getTestUrl().subscribe({next: (res)=>{console.log(res)}});


    this.authService.login(this.form.value)
      .pipe(first())
      .subscribe({
        next: (res) => {
          console.log("login");
          this.storageService.saveUser(res)
          this.router.navigate(['/dashboard']);
        },
        error: (error) => {
          console.log(error)
        }
      })
  }
}
