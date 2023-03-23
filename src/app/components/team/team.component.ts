import { RequestService } from "./../../services/request.service";
import { Router } from "@angular/router";
import { UserService } from "./../../services/user.service";
import { Component, OnInit } from "@angular/core";
import { errorAlert, successAlert } from "src/app/shared/genericFunction";

@Component({
  selector: "app-team",
  templateUrl: "./team.component.html",
  styleUrls: ["./team.component.css"],
})
export class TeamComponent implements OnInit {
  nurses: any;
  show: boolean = false;
  pageOfItems: Array<any>;
  constructor(
    private userService: UserService,
    private router: Router,
    private requestService: RequestService
  ) {}

  ngOnInit() {
    let path = this.router.url;
    console.log("path", path);

    if (path == "/allNurses") {
      this.show = true;
      console.log(this.show);
    }
    this.getAllNurses();
  }
  getAllNurses() {
    this.userService.getAllNurses().subscribe((response) => {
      this.nurses = response.nursesTab;
    });
  }

  goToDisplay(id: number) {
    this.router.navigate([`nurseProfile/${id}`]);
  }
  sendRequest(id) {
    let userId = localStorage.getItem("connectedUserId");
    let nurseId = id;
    let request = {
      userId: userId,
      date: new Date(),
      nurseId: nurseId,
      status: "Not Confirmed",
    };
    this.requestService.sendRequestToNurse(request).subscribe((Response) => {
      console.log("Response", Response.message);
    });
    successAlert("Your Contact Request has been send successfully");
  }

  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
  }
}
