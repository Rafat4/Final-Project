import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

   user(): any {
    return this.getUserCrdintial();
  }

  constructor(private http: HttpClient) { }

  setUserCrdintial(user) {
    localStorage.setItem("user", JSON.stringify(user));
  }

  getUserCrdintial(): any {
    let user = localStorage.getItem("user");

    return JSON.parse(user);
  }


  signUp(user) {
    this.http
      .post<boolean>('http://localhost:3000/signup', user)
      .subscribe(data => {
        alert('You signed Up successfully,Sign In here             ====>>>');
      });
  }

  signIn(signInModel): Observable<any> {
    return this.http
      .post('http://localhost:3000/signin', signInModel);
  }

  editProfile(user) {
    this.http
      .post<boolean>('http://localhost:3000/editProfile', user)
      .subscribe(data => {
        if (data)
          this.setUserCrdintial(data);
      });
  }

  getUserProfile(user: string ): Observable<any> {
  return  this.http
      .post<boolean>('http://localhost:3000/getUserProfile', {user: user});
  }
}
