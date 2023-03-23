import { ActivatedRoute, Router } from "@angular/router";
import { UserService } from "./../../services/user.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { successAlert } from "src/app/shared/genericFunction";
import Swal from "sweetalert2/dist/sweetalert2.js";
@Component({
  selector: "app-edit-profil",
  templateUrl: "./edit-profil.component.html",
  styleUrls: ["./edit-profil.component.css"],
})
export class EditProfilComponent implements OnInit {
  City: any = [
    "Ariana",
    "Béja",
    "Ben Arous",
    "Bizerte",
    "Gabès",
    "Gafsa",
    "Jendouba",
    "Kairouan",
    "Kasserine",
    "Kébili",
    "Kef",
    "Mahdia",
    "Manouba",
    "Médenine",
    "Monastir",
    "Nabeul",
    "Sfax",
    "Sidi Bouzid",
    "Siliana",
    "Sousse",
    "Tataouine",
    "Tozeur",
    "Tunis",
    "Zaghouan",
  ];
  profileEditForm: FormGroup;
  user: any = {};
  path: any;
  id: any;
  constructor(
    private userService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.path = this.router.url;
    if (this.path == "/editProfile") {
      this.id = localStorage.getItem("connectedUserId");
      this.userService.getUserById(this.id).subscribe((Response) => {
        this.user = Response.user;
        console.log(this.user);
      });
    } else {
      this.id = this.activatedRoute.snapshot.paramMap.get("id");
      this.userService.getUserById(this.id).subscribe((Response) => {
        this.user = Response.user;
        console.log(this.user);
      });
    }
  }

  profileEdit() {
    this.userService.editUser(this.user).subscribe((Response) => {
      console.log("here response", Response.message);
      if (this.path == "/editProfile") {
        this.router.navigate(["userProfile"]);
      } else {
        this.router.navigate([`nurseProfile/${this.id}`]);
      }
    });
    successAlert("This Profile has been modified successfully");
  }
}
