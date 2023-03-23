import { RequestService } from "./../../services/request.service";
import { UserService } from "./../../services/user.service";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { successAlert } from "src/app/shared/genericFunction";
import Swal from "sweetalert2/dist/sweetalert2.js";

@Component({
  selector: "app-nurse-profile",
  templateUrl: "./nurse-profile.component.html",
  styleUrls: ["./nurse-profile.component.css"],
})
export class NurseProfileComponent implements OnInit {
  nurse: any = {};
  id: any;
  path: any;
  e = 0;
  CVPreview: any;
  RequestShow = true;
  experienceShow = false;
  postsShow = false;
  constructor(
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private requestService: RequestService
  ) {}

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get("id");
    console.log(this.id);
    let path = this.router.url;
    console.log("path", path);

    if (path == "/userProfile") {
      this.RequestShow = false;
      this.postsShow = false;
      this.id = localStorage.getItem("connectedUserId");
    }

    this.getUserById(this.id);
  }
  getUserById(id: any) {
    this.userService.getUserById(id).subscribe((Response) => {
      this.nurse = Response.user;
      console.log(this.nurse);

      if (Response.user.role == "client") {
        this.postsShow = true;
      }
      if (Response.user.role == "nurse") {
        this.experienceShow = true;
      }
    });
  }
  goToProfileEdit() {
    this.router.navigate(["editProfile"]);
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

  displayCV() {
    const file = this.nurse.cv;
    console.log("cv", this.nurse.cv);

    const reader = new FileReader();
    reader.onload = () => {
      this.CVPreview = reader.result as string;
    };
    reader.readAsDataURL(file);

    Swal.fire({
      title: "<strong>HTML <u>example</u></strong>",
      icon: "info",
      html: `  <div class="text-center mt-3">
        <iframe
          src="${this.CVPreview} | safe"
          *ngIf="CVPreview"
          class="pt-3 pb-3"
          width="500px"
          height="500px"
        ></iframe>
      </div>`,
      showCloseButton: true,
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonText: '<i class="fa fa-thumbs-up"></i> Great!',
      confirmButtonAriaLabel: "Thumbs up, great!",
      cancelButtonText: '<i class="fa fa-thumbs-down"></i>',
      cancelButtonAriaLabel: "Thumbs down",
    });
  }
}
