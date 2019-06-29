import { Component, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';


import { Post } from './post.model';
import { LoginService } from '../login.service';
import { PostService } from '../post.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent {
  selectedFile : File = null;

  fileData = null;
  onFileSelected(event) {
    this.selectedFile =<File> event.target.file[0];

  }

  onUpload() {
    const fd =new FormData();
    fd.append('image',this.selectedFile, this.selectedFile.name);
   this.http.post('',fd)
   .subscribe(res => {
     console.log(res);
   });

  }



  fileProgress(fileInput: any) {
    this.fileData = <File>fileInput.target.files[0];
  }
 // this is for uploading img /video to the post
  // onSubmit() {
  //   // const formData = new FormData();
  //   // formData.append('file', this.fileData);
  //   // this.http.post('url/to/your/api', formData)
  //   //   .subscribe(res => {
  //   //     console.log(res);
  //   //     alert('SUCCESS !!');
  //   //   })
  // }

  enteredTitle = '';
  enteredContent = '';

  post: Post = new Post();

  @Output() postCreated = new EventEmitter<Post>();

  onAddPost(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.postService.addPost(this.post)
      .subscribe(data => {
        console.log(data)
        if (data)
          this.postCreated.emit(data);
      });
      form.resetForm();
  }
  onAddFeeling() {
    alert('Feeling')
  }

  constructor( private http:HttpClient , private loginService: LoginService, private postService: PostService) { }

  ngOnInit() {
    this.post.user = this.loginService.user()._id
  }

}
