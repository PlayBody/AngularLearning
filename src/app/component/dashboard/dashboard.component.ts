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
  user_names: Array<string> = [];
  user_score: Array<Data> = [];
  scoreOfUser: number[] = [];
  subjects: Subject[] = [];
  sub_name!: string;
  testDate!: any;
  filterByDateFrom: string = "";
  filterByDateTo: string = "";
  filterBySubject: string = "";

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

  ngOnInit() {
    if(!this.storageService.isLoggedIn()){
      this.router.navigate([''])
    } else {
      const user = this.storageService.getUser()
      this.auth_user = user.username;
    }

    this.authService.getAll().subscribe({
      next: (res) =>{
        res.map((account) => {
          this.user_names.push(account.username!);
        })
      },
      error: (e) => console.log(e)
    })

      // this.subjectService.getAll().subscribe({
      //   next: (res) => {
      //     res.map(test => this.subjects.push(test))
      //   },
      //   error: (e) => console.log(e)
      // })
      
    this.scoreService.getAllScore().subscribe({
      next: (response) => {
        response.map((res) => { 
          this.user_score.push(res) 
        });
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

  DateFrom(keyCode: string) {
    this.filterByDateFrom = keyCode;
  }

  DateTo(keyCode: string) {
    this.filterByDateTo = keyCode;
  }

  subject(keyCode: string) {
    this.filterBySubject = keyCode;
  }

  previous(){
    this.router.navigate([''])
  }

  showAddScore(){
    this.addWindow = true;
    setTimeout(() => {
      this.scoreComponent.nativeElement.classList.add('ani-scale');
    }, 0);
  }


  addScore(){
    const addDate : any = {};
    addDate['subname'] = this.sub_name;
    addDate['testDate'] = this.testDate;
    this.user_names.map((user_name, i) => {
      addDate[user_name] = this.scoreOfUser[i];
    })
    
    this.scoreService.addScore(addDate).subscribe({
      next: (res) => {
        if(res) this.addWindow = false;
      },
      error: (e) => console.log(e)
    })
  }
}
