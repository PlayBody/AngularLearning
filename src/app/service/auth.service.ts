import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Account } from '../_model/account';

const baseUrl = 'http://localhost:8080/api';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'withCredentials': 'true'
  })
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(data: any): Observable<Account> {
    return this.http.post(`${baseUrl}/auth/signin`, data, httpOptions)
  }

  register(account: Account) {
    console.log(account)
    return this.http.post(`${baseUrl}/auth/signup`, account, httpOptions);
  }

  logout(): Observable<any> {
    return this.http.post(`${baseUrl}/auth/signout`, {}, httpOptions);
  }

  getAll(): Observable<Account[]> {
    console.log("getAll() method is called")
    return this.http.get<Account[]>(`${baseUrl}/user`)
  }

}
