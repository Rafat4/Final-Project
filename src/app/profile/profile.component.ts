import { Component, OnInit, Input, } from '@angular/core';
import { LoginService } from '../login.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: any = {};
  condition = true;
  url = '';

  _userId: string = null;
  get userId(): string {
    return this._userId;
  }
  @Input('userId') set userId(val: string) {
    if (val) {
      this._userId = val;
      this.getUserProfile();
    }
  }

  _saveProfile = false;
  get saveProfile() {
    return this._saveProfile;
  }

  constructor(public loginService: LoginService, private http: HttpClient) {
  }

  ngOnInit() {
    this.getUserProfile();
  }

  edit() {
    this.condition = false;
    this._saveProfile = false;
  }

  save() {
    this._saveProfile = true;
    this.condition = true;

    this.loginService.editProfile(this.user);
  }

  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        this.url = event.target["result"];
      }
    }
  }

  delete() {
    this.url = null;
  }

  getUserProfile() {
    if (!this.userId || this.userId === this.loginService.user()._id) {
        this.user = this.loginService.user();
        this._userId = this.user._id;
    }
    else {
      this.loginService.getUserProfile(this.userId)
        .subscribe(user => {
          this.user = user;
        });

    }
  }
}
