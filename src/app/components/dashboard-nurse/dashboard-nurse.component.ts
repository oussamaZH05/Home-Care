import { ActivatedRoute, Router } from "@angular/router";
import { RequestService } from "./../../services/request.service";
import { ClientPostService } from "./../../services/client-post.service";
import { Component, OnInit } from "@angular/core";
import { errorAlert, successAlert } from "src/app/shared/genericFunction";

@Component({
  selector: "app-dashboard-nurse",
  templateUrl: "./dashboard-nurse.component.html",
  styleUrls: ["./dashboard-nurse.component.css"],
})
export class DashboardNurseComponent implements OnInit {
  requestsSent: any;
  requestsReceived: any;
  id: any;
  nurseId: any;
  show: string;
  path: any;
  constructor(
    private requestService: RequestService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.path = this.router.url;

    this.id = localStorage.getItem("connectedUserId");
    this.nurseId = { id: `${this.id}` };
    if (this.path == "/sentRequests") {
      this.getAllSentRequests();
      this.show = "send";
    } else {
      this.getAllReceivedRequests();
      this.show = "received";
    }
  }
  getAllSentRequests() {
    this.requestService
      .getRequestsWithClients(this.nurseId)
      .subscribe((Response) => {
        this.requestsSent = Response.sentRequests;
        console.log("here my sent requests", this.requestsSent);
      });
  }
  goToPostInfo(id) {
    this.router.navigate([`postInfo/${id}`]);
  }
  goToClientProfileInfo(id) {
    this.router.navigate([`nurseProfile/${id}`]);
  }

  getAllReceivedRequests() {
    this.requestService
      .getReceivedRequests(this.nurseId)
      .subscribe((Response) => {
        this.requestsReceived = Response.receivedRequests;
        for (let i = 0; i < this.requestsReceived.length; i++) {
          this.requestsReceived[i].date = new Date(
            this.requestsReceived[i].date
          );
        }
        this.requestsReceived.sort((a, b) => b.date - a.date);
        console.log("here my received requests", this.requestsReceived);
      });
  }
  confirmRequest(id) {
    let obj = { id: id, status: "Confirmed" };
    this.requestService.changeRequestStatus(obj).subscribe((response) => {
      console.log("here response from back end", response.message);
    });
    successAlert("Congratulation :) you have accepted the request");
  }
  cancelRequest(id) {
    let obj = { id: id, status: "Canceled" };
    this.requestService.changeRequestStatus(obj).subscribe((response) => {
      console.log("here response from back end", response.message);
    });
    errorAlert("You have canceled the request");
  }
}
