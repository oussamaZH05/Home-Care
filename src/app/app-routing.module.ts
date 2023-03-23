import { ChartComponent } from "./components/chart/chart.component";
import { RequestsTableComponent } from "./components/requests-table/requests-table.component";
import { PostsTableComponent } from "./components/posts-table/posts-table.component";
import { UsersTableComponent } from "./components/users-table/users-table.component";
import { AdminDashboardComponent } from "./components/admin-dashboard/admin-dashboard.component";
import { SearchNurseComponent } from "./components/search-nurse/search-nurse.component";
import { DashboardNurseComponent } from "./components/dashboard-nurse/dashboard-nurse.component";
import { EditProfilComponent } from "./components/edit-profil/edit-profil.component";
import { DashboardClientComponent } from "./components/dashboard-client/dashboard-client.component";
import { PostInfoComponent } from "./components/post-info/post-info.component";
import { ShowClientPostsComponent } from "./components/show-client-posts/show-client-posts.component";
import { ClientPostComponent } from "./components/client-post/client-post.component";
import { NurseProfileComponent } from "./components/nurse-profile/nurse-profile.component";
import { TeamComponent } from "./components/team/team.component";
import { AllNursesComponent } from "./components/all-nurses/all-nurses.component";
import { LoginComponent } from "./components/login/login.component";
import { SignupComponent } from "./components/signup/signup.component";
import { HomeComponent } from "./components/home/home.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "signupAdmin", component: SignupComponent },
  { path: "signupNurse", component: SignupComponent },
  { path: "signupClient", component: SignupComponent },
  { path: "login", component: LoginComponent },
  { path: "allNurses", component: TeamComponent },
  { path: "nurseProfile/:id", component: NurseProfileComponent },
  { path: "userProfile", component: NurseProfileComponent },
  { path: "addPost", component: ClientPostComponent },
  { path: "editPost/:id", component: ClientPostComponent },
  { path: "jobsOffers", component: ShowClientPostsComponent },
  { path: "postInfo/:id", component: PostInfoComponent },
  { path: "clientPosts", component: DashboardClientComponent },
  { path: "clientRequests", component: DashboardClientComponent },
  { path: "dashboardClient", component: DashboardClientComponent },
  { path: "editProfile", component: EditProfilComponent },
  { path: "editProfile/:id", component: EditProfilComponent },
  { path: "sentRequests", component: DashboardNurseComponent },
  { path: "receivedRequests", component: DashboardNurseComponent },
  { path: "search", component: SearchNurseComponent },
  { path: "adminDashboard", component: AdminDashboardComponent },
  { path: "usersTable", component: UsersTableComponent },
  { path: "postsTable", component: PostsTableComponent },
  { path: "requestsTable", component: RequestsTableComponent },
  { path: "myChart", component: ChartComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
