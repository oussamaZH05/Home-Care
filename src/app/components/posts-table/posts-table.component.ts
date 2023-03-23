import { Router } from "@angular/router";
import { ClientPostService } from "src/app/services/client-post.service";
import { Component, OnInit } from "@angular/core";
import { successAlert } from "src/app/shared/genericFunction";
import Swal from "sweetalert2";

@Component({
  selector: "app-posts-table",
  templateUrl: "./posts-table.component.html",
  styleUrls: ["./posts-table.component.css"],
})
export class PostsTableComponent implements OnInit {
  pageOfItems: Array<any>;
  postsTab: any;
  swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger",
    },
    buttonsStyling: false,
  });
  constructor(
    private clientPostService: ClientPostService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getAllPosts();
  }
  getAllPosts() {
    this.clientPostService.getAllPosts().subscribe((response) => {
      this.postsTab = response.postsTab;
      this.postsTab.sort((a, b) => a.date - b.date);
    });
  }

  //Confirm Post status
  confirmPost(id) {
    let postId = { postId: id };
    this.clientPostService.ConfirmPost(postId).subscribe((Response) => {
      console.log("Here Response", Response.message);
      this.getAllPosts();
    });
    successAlert("Post Confirmed !!");
  }

  //edit Post
  goToPostEdit(id) {
    this.router.navigate([`editPost/${id}`]);
  }

  //delete Post
  deletePost(id) {
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
        this.clientPostService.deletePost(id).subscribe((Response) => {
          console.log("here response", Response.isDeleted);

          this.getAllPosts();
        });
      }
    });
  }

  //pagination
  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
  }
}
