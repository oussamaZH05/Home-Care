import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class ClientPostService {
  clientPostUrl: string = "http://localhost:3002/clientPost";
  constructor(private http: HttpClient) {}
  // add a client post
  addPost(obj: any) {
    return this.http.post<{ message: string; isAdded: boolean }>(
      this.clientPostUrl,
      obj
    );
  }

  //modify an excitant post
  editPost(obj: any) {
    return this.http.put<{ message: string }>(this.clientPostUrl, obj);
  }

  //get post by Id
  getPostById(id: any) {
    return this.http.get<{ ClientPost: any; message: string }>(
      `${this.clientPostUrl}/${id}`
    );
  }

  //get all posts
  getAllPosts() {
    return this.http.get<{ postsTab: any }>(`${this.clientPostUrl}/posts/all`);
  }
  //get all User posts
  getAllUserPosts(obj: any) {
    return this.http.post<{ myPostsTab: any }>(
      `${this.clientPostUrl}/posts/user`,
      obj
    );
  }

  //get all posts with their authors
  getPostsWithAuthors() {
    return this.http.get<{ posts: any }>(
      `${this.clientPostUrl}/allPosts/authors`
    );
  }

  //delete all  Posts of one User()
  deleteAllPosts(id) {
    return this.http.delete<{ message: string }>(
      `${this.clientPostUrl}/allPosts/delete/${id}`
    );
  }

  // Confirm Post status
  ConfirmPost(obj: any) {
    return this.http.put<{ message: string }>(
      `${this.clientPostUrl}/post/confirm`,
      obj
    );
  }

  //delete Post By Id
  deletePost(id: any) {
    return this.http.delete<{ isDeleted: boolean }>(
      `${this.clientPostUrl}/${id}`
    );
  }
}
