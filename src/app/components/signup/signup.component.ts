import { UserService } from "./../../services/user.service";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MustMatch } from "src/app/validators/mustMatch";
import { Router } from "@angular/router";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"],
})
export class SignupComponent implements OnInit {
  signupNurseForm: FormGroup;
  signupForm: FormGroup;
  imagePreview: any;
  CVPreview: any;
  path: any;
  show: any;
  role: string = "admin";
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
  changeCity(e: any) {
    this.signupForm.get("address").setValue(e.target.value, {
      onlySelf: true,
    });
  }
  // Access formcontrols getter

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    this.path = this.router.url;
    console.log("path", this.path);

    this.show = this.path == "/signupNurse" ? "Nurse" : "Others";
    console.log(this.show);

    this.signupForm = this.formBuilder.group(
      {
        firstName: [
          "",
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(20),
          ],
        ],
        lastName: [
          "",
          [
            Validators.required,
            Validators.minLength(5),
            Validators.maxLength(15),
          ],
        ],
        phone: ["", [Validators.required, Validators.pattern("[0-9]{8}$")]],
        email: ["", [Validators.required, Validators.email]],
        password: [
          "",
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(12),
          ],
        ],
        experience: [
          "",
          [Validators.required, Validators.min(0), Validators.max(25)],
        ],
        confirmPassword: [""],
        address: ["", [Validators.required]],
        gender: ["", [Validators.required]],
        img: [""],
        cv: [""],
      },
      { validators: MustMatch("password", "confirmPassword") }
    );
    if (this.path == "/signupAdmin" || this.path == "/signupClient") {
      // this.signupForm.controls.experience.disable();
      this.signupForm.removeControl("experience");
      this.signupForm.removeControl("cv");
    }
  }
  signup() {
    if (this.path == "/signupNurse") {
      this.role = "nurse";
      this.signupForm.value.role = this.role;
      this.signupForm.value.status = "Not Confirmed";
      console.log("form", this.signupForm.value);
    } else if (this.path == "/signupClient") {
      this.role = "client";

      this.signupForm.value.role = this.role;
      this.signupForm.value.status = "Not Confirmed";
    } else {
      this.signupForm.value.role = this.role;
      console.log("form", this.signupForm.value);
    }

    this.userService
      .signup(
        this.signupForm.value,
        this.signupForm.value.img,
        this.signupForm.value.cv
      )
      .subscribe((response) => {
        console.log("here response", response);
      });
    console.log(this.signupForm.value);
  }

  onImageSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.signupForm.patchValue({ img: file });
    this.signupForm.updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }
  onCVSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.signupForm.patchValue({ cv: file });
    this.signupForm.updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.CVPreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }
}

// Business Logic: Signup
// app.post(
//   "/users/signup",
//   multer({ storage: storageConfig }).single("img"),
//   (req, res) => {
//     console.log("Here into BL : Add User", req.body);
//     const url = req.protocol + "://" + req.get("host");
//     let path = req.file
//       ? url + "/images/" + req.file.filename
//       : url + "/images/" + "default-avatar.png";
//     bcrypt.hash(req.body.password, 8).then((cryptedPwd) => {
//       console.log("here crypted PWD", cryptedPwd);
//       let user;
//       if (req.body.role == "nurse") {
//         user = new User({
//           firstName: req.body.firstName,
//           lastName: req.body.lastName,
//           experience: req.body.experience,
//           phone: req.body.phone,
//           address: req.body.address,
//           email: req.body.email,
//           password: cryptedPwd,
//           role: req.body.role,
//           status: req.body.status,
//           gender: req.body.gender,
//           avatar: path,
//         });
//       } else if (req.body.role == "client") {
//         user = new User({
//           firstName: req.body.firstName,
//           lastName: req.body.lastName,

//           phone: req.body.phone,
//           address: req.body.address,
//           email: req.body.email,
//           password: cryptedPwd,
//           role: req.body.role,
//           status: req.body.status,
//           gender: req.body.gender,
//           avatar: path,
//         });
//       } else {
//         user = new User({
//           firstName: req.body.firstName,
//           lastName: req.body.lastName,

//           phone: req.body.phone,
//           address: req.body.address,
//           email: req.body.email,
//           password: cryptedPwd,
//           role: req.body.role,

//           gender: req.body.gender,
//           avatar: path,
//         });
//       }

//       user.save((error, doc) => {
//         console.log("here error", error);
//         console.log("here doc", doc);
//         if (error) {
//           if (error.errors.email) {
//             res.json({ message: "email exist", isAdded: false });
//           } else if (error.errors.phone) {
//             res.json({ message: "phone exist", isAdded: false });
//           }
//         } else {
//           res.json({ message: "Added with success", isAdded: true });
//         }
//       });
//     });
//   }
// );
