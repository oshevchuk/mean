import { map } from 'rxjs/operators';
import { Post } from './post.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, ReplaySubject, Subject } from 'rxjs';

export class PostData {
  message: string;
  posts: Post[];
}

@Injectable()
export class PostsService {
  private posts: Post[] = [];
  private url = 'http://localhost:3000/api/';

  onUpdate = new ReplaySubject();
  postUpdated = new Subject<Post[]>();

  constructor(private http: HttpClient) {}

  getPosts() {
    this.http.get<PostData>(this.url + 'posts')
      .pipe(map((postData: any) => {
        return postData.posts.map(p => {
          return { id: p._id, title: p.title, content: p.content }
        });
      }))
      .subscribe(res => {
        this.posts = res;
        this.postUpdated.next([...this.posts]);
      });
  }

  getPost(id: string) {
    return this.http.get(this.url + 'post/' + id);
  }

  getPostUpdateListener() {
    return this.postUpdated.asObservable();
  }

  addPost(title: string, content: string) {
    const post: Post = { id: null, title, content} as Post;
    this.http
      .post<{message: string, postId: string}>(this.url + 'posts', post)
      .subscribe(res => {
        const id = res.postId;
        post.id = id;
        this.posts.push(post);
        this.postUpdated.next([...this.posts]);
      });
  }

  updatePost(id: string, title: string, content: string) {
    const post: Post = { id, title, content };
    this.http.put(this.url + 'posts/' + id, post).subscribe(res => {
      const updatedPosts = [...this.posts];
      const index = updatedPosts.findIndex(el => el.id === post.id);
      updatedPosts[index] = post;
      this.posts = updatedPosts;
      this.postUpdated.next([...this.posts]);
    });
  }

  deletePost(id: string | number) {
    this.http.delete(this.url + 'posts/' + id).subscribe(res => {
      const updatedPosts = this.posts.filter(post => post.id !== id);
      this.onUpdate.next(true);
      console.log('deleted');
    });
  }
}
