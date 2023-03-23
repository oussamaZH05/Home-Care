import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-caroussel",
  templateUrl: "./caroussel.component.html",
  styles: [
    `
      h1 {
        min-height: 200px;
        background-color: #ccc;
        text-align: center;
        line-height: 200px;
      }
      .leftRs {
        position: absolute;
        margin: auto;
        top: 0;
        bottom: 0;
        width: 50px;
        height: 50px;
        box-shadow: 1px 2px 10px -1px rgba(0, 0, 0, 0.3);
        border-radius: 999px;
        left: 0;
      }

      .rightRs {
        position: absolute;
        margin: auto;
        top: 0;
        bottom: 0;
        width: 50px;
        height: 50px;
        box-shadow: 1px 2px 10px -1px rgba(0, 0, 0, 0.3);
        border-radius: 999px;
        right: 0;
      }
    `,
  ],
})
export class CarousselComponent implements OnInit {
  @Input() clientInput: any;

  constructor() {}

  ngOnInit() {
    console.log("this clientInputs", this.clientInput);
  }
}
