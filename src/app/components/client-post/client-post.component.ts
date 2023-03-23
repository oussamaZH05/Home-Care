import { FormGroup } from "@angular/forms";
import { UserService } from "./../../services/user.service";
import { ActivatedRoute } from "@angular/router";
import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { ClientPostService } from "src/app/services/client-post.service";
import { successAlert } from "src/app/shared/genericFunction";

@Component({
  selector: "app-client-post",
  templateUrl: "./client-post.component.html",
  styleUrls: ["./client-post.component.css"],
})
export class ClientPostComponent implements OnInit {
  actualDate: any;
  //Form ID
  postForm: FormGroup;
  //define Object
  post: any = {};
  //ID
  id: any;
  formTitle: string = "Add Post";
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private clientPostService: ClientPostService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get("id");
    if (this.id) {
      this.formTitle = "Edit Post";
      this.clientPostService.getPostById(this.id).subscribe((Data) => {
        this.post = Data.ClientPost;
        console.log("here data", Data.ClientPost);
      });
    }
    this.actualDate = new Date();
  }
  validatePost() {
    if (this.id) {
      //Edit Match
      this.post.date = this.actualDate;
      this.clientPostService.editPost(this.post).subscribe((Response) => {
        console.log("here response", Response.message);
      });
      successAlert("Post has been modified successfully");
      // this.router.navigate(["admin"]);
    } else {
      let userId = localStorage.getItem("connectedUserId");
      this.post.date = this.actualDate;
      this.post.userId = userId;
      this.post.status = "Not Confirmed";
      this.clientPostService.addPost(this.post).subscribe((response) => {
        console.log("here response", response);
      });
      successAlert("Post has been added successfully");

      // this.router.navigate(["admin"]);
    }
  }
}
