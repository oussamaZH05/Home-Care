import { RequestService } from "./../../services/request.service";
import { Component, OnInit } from "@angular/core";
import Swal from "sweetalert2";

@Component({
  selector: "app-requests-table",
  templateUrl: "./requests-table.component.html",
  styleUrls: ["./requests-table.component.css"],
})
export class RequestsTableComponent implements OnInit {
  pageOfItems: Array<any>;
  pageOfItemsJobs: Array<any>;
  sentRequestsTab: any;
  acceptedJobsTab: any;
  constructor(private requestService: RequestService) {}

  ngOnInit() {
    this.getAllRequests();
    this.getAllAcceptedJobs();
  }
  //get all the requests that has been sent by clients to nurses
  getAllRequests() {
    this.requestService.getAllSentRequests().subscribe((response) => {
      this.sentRequestsTab = response.requestsTab;
      console.log("here requests sent", this.sentRequestsTab);
    });
  }
  //get all the job offers that was validate eby nurses
  getAllAcceptedJobs() {
    this.requestService.getAllAcceptedJobOffers().subscribe((response) => {
      this.acceptedJobsTab = response.acceptedJobsTab;
      console.log("here jobs Offers", this.acceptedJobsTab);
    });
  }
  //display Job Offer Info
  jobInfo(post) {
    Swal.fire({
      // imageUrl: "https://placeholder.pics/svg/300x1500",
      imageHeight: 320,
      imageWidth: 1000,
      // imageAlt: "A tall image",
      title: "Job Info",
      html: `  <div class="ts-wrapper justify-content-center">
      <div class="ts-box">
        <div class="ts-btm">
          <div
            class="ts-rating d-flex align-items-center justify-content-center"
          >
            <h4> ${post.title}</h4>
          </div>
          <p style="font-size: large">
           ${post.description}
          </p>
        </div>
      </div>
    </div>`,
    });
  }

  //pagination
  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
  }
  onChangePageJobs(pageOfItemsJobs: Array<any>) {
    // update current page of items
    this.pageOfItemsJobs = pageOfItemsJobs;
  }
}
