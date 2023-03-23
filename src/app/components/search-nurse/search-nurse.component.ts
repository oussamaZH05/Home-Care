import { Router } from "@angular/router";
import { UserService } from "./../../services/user.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-search-nurse",
  templateUrl: "./search-nurse.component.html",
  styleUrls: ["./search-nurse.component.css"],
})
export class SearchNurseComponent implements OnInit {
  searchForm: FormGroup;
  searchResults: any;
  aa = "dfghjklmù";
  msgError: string;
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
  constructor(
    private router: Router,
    private userService: UserService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.searchForm = this.formBuilder.group({
      address: [""],
      experienceMin: ["", [Validators.min(0), Validators.max(25)]],
      experienceMax: ["", [Validators.min(0), Validators.max(25)]],
    });
  }
  searchNurse() {
    console.log("here search obj", this.searchForm.value);
    this.userService
      .searchNurses(this.searchForm.value)
      .subscribe((Response) => {
        this.searchResults = Response.searchTab;
        console.log("here search tab", this.searchResults);
      });
  }
  goToSearchedProfile(id) {
    this.router.navigate([`nurseProfile/${id}`]);
  }
}
