import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-titles",
  templateUrl: "./titles.component.html",
  styleUrls: ["./titles.component.css"],
})
export class TitlesComponent implements OnInit {
  @Input() title: string;
  constructor() {}

  ngOnInit() {}
}
