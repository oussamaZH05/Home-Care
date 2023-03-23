import { Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { UserService } from "./../../services/user.service";
import { FormBuilder } from "@angular/forms";
import { FormGroup } from "@angular/forms";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  errorMsg: string;
  //formID
  loginForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: [""],
      phone: [""],
      password: ["", [Validators.required]],
    });
  }

  login() {
    this.userService.login(this.loginForm.value).subscribe((response) => {
      console.log("here response", response);
      if (response.message != "2") {
        //error message
        this.errorMsg = "Check (Email or Phone) / PWD";
      } else {
        localStorage.setItem("connectedUserId", response.user.id);
        // response.user.role == "user"
        this.router.navigate([""]);
        //   : this.router.navigate(["admin"]);
      }
    });
  }
}
