import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  signUpModel = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    gender: 1
  };

  constructor(private loginService: LoginService) { }

  ngOnInit() {
  }

  signUp(valid) {
    if (valid) {
      this.loginService.signUp(this.signUpModel);
    }
  }
}
