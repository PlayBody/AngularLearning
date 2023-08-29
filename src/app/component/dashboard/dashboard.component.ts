import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { Router } from '@angular/router';

import { StorageService } from 'src/app/service/storage.service';
import { AuthService } from 'src/app/service/auth.service';
import { InputComponent } from '../material/input/input.component';
import { ScoreService } from 'src/app/service/score.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {

  addWindow = false;
  auth_user?: string;
  usernames: string[] = [];
  scores: { username: string, score: number | 0 }[] = [];
  sub_name!: string;
  testDate!: any;

  @ViewChild('addScroeComponent', {static: false}) scoreComponent! : ElementRef;
  @ViewChild('subInput', {static: false}) subInput!: InputComponent;
  @ViewChild('dateInput', {static: false}) dateInput!: InputComponent
  

  constructor( 
    private router: Router,
    private storageService: StorageService,
    private authService: AuthService,
    private scoreService: ScoreService
  ) {}

  ngOnInit(): void {
      // if(!this.storageService.isLoggedIn()){
      //   this.router.navigate([''])
      // } else {
        const user = this.storageService.getUser()
        this.auth_user = user.username;
      // }

      // usernames = ['RHS', 'KDI', 'HNJ', 'RJM', 'KYH', 'CGS', 'PSG', 'CG']

      this.authService.getAll().subscribe({
        next: (res) =>{
          res.map((account, index) => {
            this.usernames.push(account.username!);
            this.scores[index].username = account.username!;
          })
        },
        error: (e) => console.log(e)
      })
  }

  logout(){
    this.authService.logout().subscribe({
      next: (res) => {
        console.log(res);
        if(res) {
          this.router.navigate([''])
          this.storageService.clean()
        }
      },
      error: (e) => {
        console.log(e)
      }
    })
  }

  previous(){
    this.router.navigate([''])
  }

  calcAverage(scores: number[]): number {
    const len = scores.length;
    if(len == 0)  return 0;

    const sum = scores.reduce((total, score) => total + score, 0);
    const average = sum / len;
    return average;
  }

  showAddScore(){
    this.addWindow = true;
    setTimeout(() => {
      this.scoreComponent.nativeElement.classList.add('ani-scale');
    }, 0);
  }

  addScore(){
    this.sub_name = this.subInput.inputValue!;
    this.testDate = this.dateInput.inputValue!;
    const addDate = {'subname': this.sub_name, 'testDate': this.testDate, 'scores': this.scores};
    this.scoreService.addScore(addDate).subscribe({
      next: (res) => {
        if(res) this.addWindow = false;
      },
      error: (e) => console.log(e)
    })
  }
}
