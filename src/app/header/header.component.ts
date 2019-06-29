import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from '../login.service';
import { PostService } from '../post.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  get userLogedIn(): boolean {
    let user = this.loginService.getUserCrdintial();
    return user;
  }

  error: any;

  signInModel = {
    email: '',
    password: ''
  }
  title = 'Reefo';

  constructor(private router: Router,
     private loginService: LoginService,private postService: PostService) {
     }

  ngOnInit() { }

  signIn() {
    this.loginService
      .signIn( this.signInModel)
      .subscribe(user => {
        if (user) {
          this.loginService.setUserCrdintial(user);

          this.router.navigate(['/home']);
        } else { alert('please sign up first') }
      });
  }

  logout(){
      this.loginService.setUserCrdintial(null);
  }
  search(text,form: NgForm) {
    this.postService.getAllPosts(null, text);
    form.resetForm();
  }
}
