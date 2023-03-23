import { ClientPostService } from "./../../services/client-post.service";
import { Router } from "@angular/router";
import { UserService } from "./../../services/user.service";
import { Component, EventEmitter, OnInit } from "@angular/core";
import {
  deleteAlert,
  errorAlert,
  successAlert,
} from "src/app/shared/genericFunction";
import Swal from "sweetalert2";

@Component({
  selector: "app-users-table",
  templateUrl: "./users-table.component.html",
  styleUrls: ["./users-table.component.css"],
})
export class UsersTableComponent implements OnInit {
  pageOfItems: Array<any>;
  pageOfItemsAdmins: Array<any>;
  pageOfItemsNurse: Array<any>;
  name: any;
  usersTab: any;
  adminsTab: any;
  nursesTab: any;
  clientsTab: any;
  swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger",
    },
    buttonsStyling: false,
  });
  constructor(
    private userService: UserService,
    private router: Router,
    private clientPostService: ClientPostService
  ) {}

  ngOnInit() {
    this.getAllUsers();
  }
  getAllUsers() {
    this.userService.getAllUsers().subscribe((response) => {
      this.usersTab = response.usersTab;
      this.adminsTab = this.usersTab.filter((elt) => elt.role == "admin");
      console.log(this.adminsTab);
      this.nursesTab = this.usersTab.filter((elt) => elt.role == "nurse");
      console.log(this.nursesTab);
      this.clientsTab = this.usersTab.filter((elt) => elt.role == "client");
      console.log(this.clientsTab);
    });
  }
  //Confirm User status
  confirmUser(id) {
    let userId = { userId: id };
    this.userService.ConfirmUser(userId).subscribe((Response) => {
      console.log("Here Response", Response.message);
      this.getAllUsers();
    });
    successAlert("User Confirmed !!");
  }

  //edit user Profile
  goToProfileEdit(id) {
    this.router.navigate([`editProfile/${id}`]);
  }

  //delete User
  deleteUser(id: any) {
    Swal.fire({
      title: "Are you sure?",
      text: "do you really want to delete this user You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
        this.userService.deleteUser(id).subscribe((Response) => {
          console.log("here response", Response.isDeleted);
          this.deleteExUserPosts(id);
          this.getAllUsers();
        });
      }
    });
  }

  //delete User Posts when deleting the user
  deleteExUserPosts(id) {
    this.clientPostService.deleteAllPosts(id).subscribe((Response) => {
      console.log("here response", Response.message);
    });
  }
  //ngClass function
  genderColor(gender) {
    let result =
      "linear-gradient(90deg, rgba(255,0,0,0.2) 0%, rgba(255,154,0,0.2) 10%, rgba(208,222,33,0.2) 20%, rgba(79,220,74,0.2) 30%, rgba(63,218,216,0.2) 40%, rgba(47,201,226,0.2) 50%, rgba(28,127,238,0.2) 60%, rgba(95,21,242,0.2) 70%, rgba(186,12,248,0.2) 80%, rgba(251,7,217,0.2) 90%, rgba(255,0,0,0.2) 100%)";
    if (gender == "0") {
      result = "#007bff30";
    } else if (gender == "1") {
      result = "#ed65b526";
    }
    return result;
  }
  //pagination
  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
  }
  onChangePageAdmins(pageOfItemsAdmins: Array<any>) {
    // update current page of items
    this.pageOfItemsAdmins = pageOfItemsAdmins;
  }
  onChangePageNurses(pageOfItemsNurse: Array<any>) {
    // update current page of items
    this.pageOfItemsNurse = pageOfItemsNurse;
  }
}
