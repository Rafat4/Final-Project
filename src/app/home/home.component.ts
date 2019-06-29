import { Component, OnInit } from '@angular/core';
import { Post } from '../post/post.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  newPost: Post = null;
  userId: string = null;

  constructor(private router: ActivatedRoute) { }

  ngOnInit() {
    this.router.params.subscribe(params => {
      this.userId = params['userId'];
    });
  }

  onPostAdded(post) {
    this.newPost = post;
  }
}
