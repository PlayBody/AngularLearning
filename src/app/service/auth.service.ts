import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Account } from '../_model/account';

const baseUrl = 'http://192.168.133.38:8080/api';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(data: any): Observable<Account> {
    // let userInfo = JSON.stringify(data)
    // console.log(userInfo)
    console.log(data.email);
    return this.http.post(`${baseUrl}/auth/signin`, data, httpOptions)
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

  getTestUrl(): Observable<any> {
    return this.http.get("https://www.google.com/search?q=example+api&sca_esv=561360965&sxsrf=AB5stBgevbqlwJkQGoumBZwZ5g5bvIppSw%3A1693420944285&ei=kI3vZO7-EJPcrgS1vLawBA&ved=0ahUKEwjuhtvOhIWBAxUTrosKHTWeDUYQ4dUDCBA&uact=5&oq=example+api&gs_lp=Egxnd3Mtd2l6LXNlcnAiC2V4YW1wbGUgYXBpMggQABiKBRiRAjIKEAAYgAQYFBiHAjIKEAAYgAQYFBiHAjIFEAAYgAQyBRAAGIAEMgUQABiABDIFEAAYgAQyBRAAGIAEMgUQABiABDIFEAAYgARI5SRQlwtY7SJwBXgBkAEAmAHCAqABmheqAQYyLTExLjG4AQPIAQD4AQHCAgoQABhHGNYEGLADwgIKEAAYigUYsAMYQ8ICBxAAGIoFGEPCAgsQLhiABBjHARjRA8ICBxAAGIAEGArCAgsQLhiABBjHARivAcICBRAuGIAE4gMEGAAgQYgGAZAGCg&sclient=gws-wiz-serp&bshm=rime/1")
  }
}
