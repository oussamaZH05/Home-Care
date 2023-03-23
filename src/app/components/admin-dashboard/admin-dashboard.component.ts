import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { ClientPostService } from "src/app/services/client-post.service";
import { UserService } from "src/app/services/user.service";

@Component({
  selector: "app-admin-dashboard",
  templateUrl: "./admin-dashboard.component.html",
  styleUrls: ["./admin-dashboard.component.css"],
})
export class AdminDashboardComponent implements OnInit {
  constructor(
    private router: Router,
    private userService: UserService,
    private clientPostService: ClientPostService
  ) {}
  usersTab: any;
  postsTab: any;
  k: any;
  ngOnInit() {}
  goToUsersTable() {
    this.router.navigate(["aaa"]);
  }
}
