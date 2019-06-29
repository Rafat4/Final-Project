import { Component, Input, OnInit } from '@angular/core';
import { Post, PostComment } from '../post.model';
import { PostService } from 'src/app/post.service';
import { LoginService } from 'src/app/login.service';

@Component({
  selector: 'app-postlist',
  templateUrl: './postlist.component.html',
  styleUrls: ['./postlist.component.css']
})
export class PostlistComponent implements OnInit {

  posts: Post[] = [];
  @Input() newPost: Post;
  @Input() userId: string;

  user() {
    return this.loginService.user();
  }

  constructor(private postService: PostService, private loginService: LoginService) {
  }

  ngOnInit() {
    this.postService.getAllPosts(this.userId);
    this.postService.posts.subscribe(data => {
        this.posts = data;
      });
  }

  deletePost(id) {
    this.postService.deletePost(id).subscribe(data => {
      this.posts = this.posts.filter(post => {
        return post._id != id;
      });
    });
  }

  addLike(post) {
    let postLike = {
      user: this.user()._id,
      post: post
    };

    this.postService.addLike(postLike).subscribe(data => {
      let newLike ={
        user: this.user(),
        post: post
      };

      let targetPost = this.posts.find(p => p._id == post);

      if (targetPost)
        targetPost.likes.push(newLike);
      else if (this.newPost._id == post)
        this.newPost.likes.push(newLike);
    });
  }

  addComment($event, post, $comment) {
    if ($event.keyCode == 13) {
      var comment = $comment.value;
      $comment.value = '';
      var postComment = {
        user: this.user()._id,
        post: post,
        comment: comment
      };

      this.postService.addComment(postComment).subscribe(data => {
        let newComment = {
          user: this.user(),
          post: post,
          comment: comment
        };

        let targetPost = this.posts.find(p => p._id == post);

        if (targetPost)
          targetPost.comments.push(newComment);
        else if (this.newPost._id == post)
          this.newPost.comments.push(newComment);

      })
    }
  }
}
