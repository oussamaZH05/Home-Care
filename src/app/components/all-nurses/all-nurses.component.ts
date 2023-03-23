import { UserService } from "./../../services/user.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-all-nurses",
  templateUrl: "./all-nurses.component.html",
  styleUrls: ["./all-nurses.component.css"],
})
export class AllNursesComponent implements OnInit {
  nurses: any;
  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.getAllNurses().subscribe((response) => {
      this.nurses = response.nursesTab;
    });
  }
}
