import { RequestService } from "./../../services/request.service";
import { Router } from "@angular/router";
import { ClientPostService } from "./../../services/client-post.service";
import { Component, OnInit } from "@angular/core";
import Swal from "sweetalert2";

@Component({
  selector: "app-dashboard-client",
  templateUrl: "./dashboard-client.component.html",
  styleUrls: ["./dashboard-client.component.css"],
})
export class DashboardClientComponent implements OnInit {
  result: any;
  myPosts: any;
  myRequests: any;
  id: any;
  obj: any;
  path: any;
  show: string;
  swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger",
    },
    buttonsStyling: false,
  });
  constructor(
    private clientPostService: ClientPostService,
    private requestService: RequestService,
    private router: Router
  ) {}

  ngOnInit() {
    this.path = this.router.url;
    this.id = localStorage.getItem("connectedUserId");
    let k = this.id;
    console.log(this.id);
    this.obj = { id: k };
    console.log("here obj", this.obj);
    if (this.path == "/clientPosts") {
      this.getMyPosts(this.obj);
      this.show = "posts";
    } else {
      this.getMyRequests(this.obj);
      this.show = "requests";
    }
  }
  getMyPosts(id) {
    this.clientPostService.getAllUserPosts(id).subscribe((Response) => {
      this.myPosts = Response.myPostsTab;
      console.log("here my posts", this.myPosts);
    });
  }
  getMyRequests(id) {
    this.requestService.getClientRequests(id).subscribe((Response) => {
      this.myRequests = Response.myRequestsTab;
      console.log("here my posts", this.myRequests);
    });
  }
  editPost(postId) {
    this.router.navigate([`editPost/${postId}`]);
  }
  viewReservation(nurseId) {
    this.router.navigate([`nurseProfile/${nurseId}`]);
  }

  //delete Post
  deletePost(PostId) {
    Swal.fire({
      title: "Are you sure?",
      text: "do you really want to delete this post, You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
        this.clientPostService.deletePost(PostId).subscribe((Response) => {
          console.log("here response", Response.isDeleted);

          this.getMyPosts(this.id);
        });
      }
    });
  }
  //status style
  statusStyle(status) {
    this.result = "fa fa-check-circle fa-1x";
    if (status == "Not Confirmed") {
      this.result = "fa fa-times-circle";
    } else {
    }
    return this.result;
  }
}
