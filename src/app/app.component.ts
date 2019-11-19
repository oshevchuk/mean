import { PostsService, PostData } from './posts/posts.service';
import { Post } from './posts/post.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'mean-c';
  posts: Post[] = [];
  constructor(public postsService: PostsService) {}

  ngOnInit(): void {
    // this.onPostCreated(null);
    this.postsService.onUpdate.subscribe(up => {
      this.postsService.getPosts();
    });
    this.postsService.onUpdate.next(true);
  }

  onPostCreated(e) {
    // this.postsService.getPosts()
    //   .pipe(map((postData: any) => {
    //     return postData.posts.map(p => { return { id: p._id, title: p.title, content: p.content }})
    //   }))
    //   .subscribe(res => {
    //     console.log(res);
    //     this.posts = res;
    //   })
  }
}
