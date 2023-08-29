import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Account } from '../_model/account';

const baseUrl = 'http://localhost:8080/api';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<Account> {
    return this.http.post(`${baseUrl}/auth/signin`, { email, password}, httpOptions)
  }

  register(account: Account): Observable<any> {
    return this.http.post(`${baseUrl}/auth/signup`, account, httpOptions);
  }

  logout(): Observable<any> {
    return this.http.post(`${baseUrl}/signout`, {}, httpOptions);
  }

  getAll(): Observable<Account[]> {
    return this.http.get<Account[]>(`${baseUrl}/user`)
  }
}
