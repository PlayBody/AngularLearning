import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs';

import { MustMatch } from 'src/app/_helper/must-match.validator';
import { Account } from 'src/app/_model/account';
import { AuthService } from 'src/app/service/auth.service';
import { StorageService } from 'src/app/service/storage.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  form! : FormGroup;
  submitted = false;

  @Output() clicked = new EventEmitter<void>();
  @Output() isSuceed = new EventEmitter<void>();

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private storageService: StorageService,
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      role: [[], Validators.required]
    }, {
      validator: MustMatch('password', 'confirmPassword')
    });
  }
  
  get f() { return this.form.controls; }

  hideRegisterEvent(){
    this.clicked.emit()
  }

  SubmitRegister() {
    this.submitted = true;

    // Stop here if form is invalid
    if(this.form.invalid) {
      return;
    }

    delete this.form.value.confirmPassword;
    switch (this.form.value['role']) {
      case 'user':
        this.form.value['role'] = ['user'];
        break;
      case 'admin':
        this.form.value['role'] = ['admin'];      
    }
    let reg_userInfo: Account = this.form.value
    console.log(reg_userInfo)

    this.authService.register(reg_userInfo)
      .pipe(first())
      .subscribe({
        next: (res) => {
          console.log(res)
          if(res) {
            this.isSuceed.emit();
            // window.location.reload();
          }
        },
        error: (e) => {
          console.log(e);
        }
      })
  }

}
