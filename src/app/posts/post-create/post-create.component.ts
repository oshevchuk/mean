import { PostsService } from './../posts.service';
import { Post } from './../post.model';
import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { NgForm, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss']
})
export class PostCreateComponent implements OnInit {
  private mode = 'create';
  private postId: string;
  post: Post;

  form: FormGroup;

  constructor(private postsService: PostsService,
              private route: ActivatedRoute,
              private fb: FormBuilder) {}

  ngOnInit() {
    this.form = new FormGroup({
      id: new FormControl(null),
      title: new FormControl(null, { validators: [Validators.required] }),
      content: new FormControl(null, { validators: [Validators.required] }),
    });

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postId')) {
        this.mode = 'edit';
        this.postId = paramMap.get('postId');
        this.postsService.getPost(this.postId).subscribe((post: Post) => {
          this.post = post;
        });
      } else {
        this.mode = 'create';
        this.postId = null;
        this.post = {title: '', content: '', id: null};
      }
    });
  }

  onSavePost(form: NgForm): void {
    if (form.invalid) {
      return;
    }
    if (this.mode === 'create') {
      this.postsService.addPost(form.value.title, form.value.content);
    } else {
      this.postsService.updatePost(this.postId, form.value.title, form.value.content);
    }
    form.resetForm();
  }
}
