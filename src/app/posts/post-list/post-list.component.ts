import { PostsService } from './../posts.service';
import { Post } from './../post.model';
import { Component, EventEmitter, OnInit, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit, OnDestroy {
  posts: Post[] = [];
  private postsSub: Subscription;

  constructor(private postsService: PostsService) {

  }

  ngOnInit() {   
    this.postsService.getPosts();
    this.postsSub = this.postsService.getPostUpdateListener().subscribe((res: Post[]) => {
      this.posts = res;
    })
  }

  ngOnDestroy(): void {
    this.postsSub.unsubscribe();
  }

  delete(id) {
    console.log(id);
    this.postsService.deletePost(id);
  }
}
