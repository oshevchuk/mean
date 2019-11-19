import { PostsService } from './../posts.service';
import { Post } from './../post.model';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html'
})
export class PostListComponent {
  @Input() posts: Post[] = [];

  constructor(private postService: PostsService) {

  }

  delete(post: Post) {
    this.postService.deletePost(post.id);
  }
}
