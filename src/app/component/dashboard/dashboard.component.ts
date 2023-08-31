import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { InputComponent } from '../material/input/input.component';
import { StorageService } from 'src/app/service/storage.service';
import { AuthService } from 'src/app/service/auth.service';
import { SubjectService } from 'src/app/service/subject.service';
import { ScoreService } from 'src/app/service/score.service';
import { Subject } from 'src/app/_model/subject.model';
import { Data } from 'src/app/_model/data.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {

  addWindow = false;
  auth_user?: string;
  usernames: string[] = [];
  scores: { username: string, score: number | '0' }[] = [];
  user_score: Data[] = [];
  scoreOfUser: number[] = [];
  scoreArray: number[][] = [];
  subjects: Subject[] = [];
  sub_name!: string;
  testDate!: any;
  

  @ViewChild('addScroeComponent', {static: false}) scoreComponent! : ElementRef;
  @ViewChild('subInput', {static: false}) subInput!: InputComponent;
  @ViewChild('dateInput', {static: false}) dateInput!: InputComponent
  

  constructor( 
    private router: Router,
    private storageService: StorageService,
    private authService: AuthService,
    private scoreService: ScoreService,
    private subjectService: SubjectService
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

      this.subjectService.getAll().subscribe({
        next: (res) => {
          console.log(res)
          res.map(test => this.subjects.push(test))
        },
        error: (e) => console.log(e)
      })

      this.scoreService.getAllScore().subscribe({
        next: (response) => {
          response.map((res) => {
            this.user_score.push(res)
            let EachUserArray : number [] = []
            res.test?.map(test => {
              if(test.score != undefined) 
                EachUserArray.push(test.score)
            })
            this.scoreArray.push(EachUserArray);
            
          })
          console.log(this.user_score)
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


  filterBy(currentUser: string, testType?: string, testDate?: string) {
    const score_array: number[] = [];

    this.user_score.map((data) => {
      data.username === currentUser &&
      data.test!.map((test) => {
        if (
          test.subName === testType &&
          test.testDate === testDate
        ) {
          score_array.push(test.score!)
        }
      })
      
    })


    return score_array;
  }

  previous(){
    this.router.navigate([''])
  }

  calcAverage(scores: number[]): number {
    // console.log("this is scoreofUser", scores)
    console.log(scores);
    const len = scores.length;
    if(len == 0)  return 0;

    const sum = scores.reduce((total, score) => total + score, 0);
    const average = Number((sum / len).toFixed(2))
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
