import { Login } from './../models/login';
import { Register } from './../models/register';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedIn = new BehaviorSubject(null);
  constructor(private http: HttpClient) {
  }

  isLoggedIn(): string{
    if(localStorage.getItem('loggedInUser'))
      return localStorage.getItem('loggedInUser');


    return this.loggedIn.value;
  }

  public getCourses(): Observable<any>{
    return this.http.get(environment.url + "courses");
  }

  loginFacial(): Observable<any> {
    return this.http.get(environment.url + "login_face_detection")
    .pipe(map(res => {
      const accesToken = res["access_token"];
      localStorage.setItem('loggedInUser', accesToken);
      this.loggedIn.next(accesToken);

      return accesToken;
    }))
}

  public register(register: Register): Observable<any>{
    return this.http.post(environment.url + "register", register);
  }

  public login(login: Login, rememberMe: boolean): Observable<any>{
    return this.http.post(environment.url + "login", login)
      .pipe(map(res => {
        const accesToken = res["access_token"];
        if(rememberMe)
          localStorage.setItem('loggedInUser', accesToken);
        this.loggedIn.next(accesToken);

        return accesToken;
      }))
  }

    public logoutUser(): void {
      localStorage.removeItem('loggedInUser');
      this.loggedIn.next(null);
  }

  getDecodedAccessToken(token: string = this.isLoggedIn()): any {
    try{
        return jwt_decode(token);
    }
    catch(Error){
        return null;
    }
  }

}
