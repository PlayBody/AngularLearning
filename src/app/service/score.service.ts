import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Data } from '../_model/data.model';

const API_URL = 'http://localhost:8080/api/grades';

@Injectable({
  providedIn: 'root'
})
export class ScoreService {

  constructor( private http: HttpClient ) { }

  getAllScore(): Observable<any> {
    return this.http.get(API_URL);
  }

  addScore(data: any) {
    return this.http.post(API_URL, data);
  }

  updateScore(data: Data) {
    return this.http.put(API_URL, data);
  }

  deleteScore(id: any) {
    return this.http.delete(API_URL, id);
  }
}
