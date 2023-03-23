import { Router } from "@angular/router";
import { UserService } from "./../../services/user.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent implements OnInit {
  userId: any;
  user: any;
  role: any;
  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    this.userId = localStorage.getItem("connectedUserId");
    if (this.userId) {
      this.getUserById(this.userId);
    } else {
      this.role = "none";
    }
  }

  getUserById(id: any) {
    this.userService.getUserById(id).subscribe((Response) => {
      this.user = Response.user;
      if (this.user.role == "nurse") {
        this.role = "nurse";
      } else if (this.user.role == "client") {
        this.role = "client";
      } else {
        this.role = "admin";
      }
    });
  }
  logOut() {
    localStorage.removeItem("connectedUserId");
    this.router.navigate(["login"]);
  }
}
