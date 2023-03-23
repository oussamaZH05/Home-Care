import { Component, Input, OnInit, Output } from "@angular/core";
import { Chart } from "node_modules/chart.js";
import { ClientPostService } from "src/app/services/client-post.service";
import { UserService } from "src/app/services/user.service";

@Component({
  selector: "app-chart",
  templateUrl: "./chart.component.html",
  styleUrls: ["./chart.component.css"],
})
export class ChartComponent implements OnInit {
  @Input() chartType: any;
  @Output() userNumbers: any;
  constructor(
    private userService: UserService,
    private clientPostService: ClientPostService
  ) {}
  usersTab: any;
  nursesTab: any;
  clientsTab: any;
  postsTab: any;
  reservedPostsTab: any;
  availablePostsTab: any;
  show: any;

  ngOnInit() {
    if (this.chartType == "Pie") {
      this.getAllUsers();
      this.show = "Pie";
    } else if (this.chartType == "BarForPost") {
      this.getAllPosts();
      this.show = "Bar";
    }
  }
  getAllPosts() {
    this.clientPostService.getAllPosts().subscribe((response) => {
      this.postsTab = response.postsTab;
      this.reservedPostsTab = this.postsTab.filter(
        (elt) => elt.status == "reserved"
      );

      this.availablePostsTab = this.postsTab.filter(
        (elt) => elt.status == "Confirmed"
      );
      this.postBarChart();
      console.log("res", this.reservedPostsTab.length);
      console.log("avai", this.availablePostsTab.length);
    });
  }
  postBarChart() {
    new Chart("myChartPostBar", {
      type: "bar",

      data: {
        labels: ["Available", "Reserved"],
        datasets: [
          {
            label: "Posts",
            data: [this.availablePostsTab.length, this.reservedPostsTab.length],
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(255, 159, 64, 0.2)",
              "rgba(255, 205, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(201, 203, 207, 0.2)",
            ],
            borderColor: [
              "rgb(255, 99, 132)",
              "rgb(255, 159, 64)",
              "rgb(255, 205, 86)",
              "rgb(75, 192, 192)",
              "rgb(54, 162, 235)",
              "rgb(153, 102, 255)",
              "rgb(201, 203, 207)",
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            type: "linear",
            grace: "10%",
          },
        },
        plugins: {
          legend: {
            display: true,
          },
        },
      },
    });
  }
  pieChart() {
    new Chart("myChartPie", {
      type: "pie",

      data: {
        labels: ["nurses", "clients"],
        datasets: [
          {
            label: "My First Dataset",
            data: [this.nursesTab.length, this.clientsTab.length],
            backgroundColor: [
              "rgb(255, 99, 132)",
              "rgb(54, 162, 235)",
              "rgb(255, 205, 86)",
            ],
            hoverOffset: 4,
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            display: true,
          },
        },
      },
    });
  }

  getAllUsers() {
    this.userService.getAllUsers().subscribe((response) => {
      this.usersTab = response.usersTab;
      this.nursesTab = this.usersTab.filter((elt) => elt.role == "nurse");
      this.clientsTab = this.usersTab.filter((elt) => elt.role == "client");
      this.pieChart();
      this.userNumbers = this.usersTab.length;
    });
  }
}
