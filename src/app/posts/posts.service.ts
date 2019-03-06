import { Post } from './post.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

export class PostsData {
  public message: string;
  public posts: any[];
}

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  constructor(private http: HttpClient, private router: Router) {}

  getPosts() {
    this.http
      .get<PostsData>('http://localhost:3000/api/posts')
      .pipe(map((postData: PostsData) => {
        return postData.posts.map(post => {
          return {title: post.title, content: post.content, id: post._id};
        });
      }))
      .subscribe((postsData) => {
        this.posts = postsData;
        this.postsUpdated.next([...this.posts]);
      });
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  getPost(id: string) {
    return this.http.get<{_id: string, title: string, content: string}>('http://localhost:3000/api/posts/' + id);
  }

  addPost(title: string, content: string) {
    const post: Post = {id: 'null', title, content};
    this.http.post<{message: string, postId: string}>('http://localhost:3000/api/posts', post)
      .subscribe((res) => {
        const id = res.postId;
        post.id = id;
        this.posts.push(post);
        this.postsUpdated.next([...this.posts]);
        this.router.navigate(['/']);
      });
  }

  deletePost(postId) {
    this.http.delete('http://localhost:3000/api/posts/' + postId).subscribe(() => {
      const updatePosts = this.posts.filter(post => post.id !== postId);
      this.posts = updatePosts;
      this.postsUpdated.next([...this.posts]);
    });
  }

  updatePost(id: string, title: string, content: string) {
    const post: Post = {id, title, content};
    this.http.put('http://localhost:3000/api/posts/' + id, post)
      .subscribe(res => {
        const updatedPosts: Post[] = [...this.posts];
        const oldPostIndex = updatedPosts.findIndex( p => p.id === post.id);
        updatedPosts[oldPostIndex] = post;
        this.posts = updatedPosts;
        this.postsUpdated.next([...this.posts]);
        this.router.navigate(['/']);
      });
  }
}
