import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Post } from './post/post.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  posts = new Subject<Post[]>();

  constructor(private http: HttpClient) { }

  addLike(postLike): Observable<any> {
    return this.http.post('http://localhost:3000/likePost', postLike);
  }

  addPost(post): Observable<any> {
    return this.http.post('http://localhost:3000/addPost', post);
  }

  getAllPosts(userId, searchText = null): void {
    let query = {
      userId:userId,
      searchText:searchText
    };

    this.http.post('http://localhost:3000/getAllPosts', query)
    .subscribe((data: Post[]) => {
      this.posts.next(data);
    });
  }

  deletePost(id): Observable<any> {
    return this.http.post('http://localhost:3000/deletePost', { _id: id });
  }

  deleteLike(id): Observable<any> {
    return this.http.post('http://localhost:3000/deleteLike', { _id: id });
  }

  addComment(comment): Observable<any> {
    return this.http.post('http://localhost:3000/addComment', comment);
  }
}
