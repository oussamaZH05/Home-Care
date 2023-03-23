import { UserService } from "./../../services/user.service";
import { ActivatedRoute, Router } from "@angular/router";
import { ClientPostService } from "./../../services/client-post.service";
import { Component, OnInit } from "@angular/core";
import { Message } from "@angular/compiler/src/i18n/i18n_ast";
import { aa, successAlert } from "src/app/shared/genericFunction";

@Component({
  selector: "app-post-info",
  templateUrl: "./post-info.component.html",
  styleUrls: ["./post-info.component.css"],
})
export class PostInfoComponent implements OnInit {
  id: any;
  connectedUser: any;
  msg: any;
  show = true;
  post: any = {};
  author: any = {};
  constructor(
    private clientPostService: ClientPostService,
    private userService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    let userId = localStorage.getItem("connectedUserId");

    this.id = this.activatedRoute.snapshot.paramMap.get("id");
    this.getPostInfo();
    this.getUserById(userId);
  }
  getPostInfo() {
    this.clientPostService.getPostById(this.id).subscribe((Response) => {
      this.post = Response.ClientPost;
      this.userService.getUserById(this.post.userId).subscribe((Data) => {
        this.author = Data.user;
        console.log("here author", this.author);
      });
    });
  }
  jobValidation() {
    this.post.status = "reserved";
    this.post.nurseId = localStorage.getItem("connectedUserId");

    this.clientPostService.editPost(this.post).subscribe((Response) => {
      console.log("here response", Response.message);
    });
    successAlert("Your Job application has been saved successfully");
  }
  getUserById(id: any) {
    this.userService.getUserById(id).subscribe((Response) => {
      this.connectedUser = Response.user;
      if (Response.user.role == "client") {
        this.show = false;
      }
    });
  }
}
