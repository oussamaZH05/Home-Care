import { UserService } from "./../../services/user.service";
import { Router } from "@angular/router";
import { ClientPostService } from "src/app/services/client-post.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-show-client-posts",
  templateUrl: "./show-client-posts.component.html",
  styleUrls: ["./show-client-posts.component.css"],
})
export class ShowClientPostsComponent implements OnInit {
  pageOfItems: Array<any>;
  posts: any;
  show = true;
  path: any;
  constructor(
    private clientPostService: ClientPostService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    this.path = this.router.url;
    if (this.path == "/jobsOffers") {
      this.show = false;
    }
    this.getPostsWithAuthors();
  }

  getPostsWithAuthors() {
    this.clientPostService.getPostsWithAuthors().subscribe((response) => {
      this.posts = response.posts;
      console.log("here response", this.posts);

      for (let i = 0; i < this.posts.length; i++) {
        this.posts[i].date = new Date(this.posts[i].date);
      }
      this.posts.sort((a, b) => b.date - a.date);
      console.log("here response with authors", this.posts);
    });
  }

  goToDisplayPostInfo(id: number) {
    this.router.navigate([`postInfo/${id}`]);
  }
  //pagination
  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
  }

  // getAllPosts() {
  //   this.clientPostService.getAllPosts().subscribe((response) => {
  //     this.posts = response.postsTab;
  //     this.posts.sort((a, b) => a.date - b.date);
  //   });
  // }
}
